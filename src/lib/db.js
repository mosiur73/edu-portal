import { MongoClient, ObjectId } from "mongodb"

let client
let db

 export async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI)
    await client.connect()
    db = client.db() // Uses database name from connection string
    console.log("DB: Connected to MongoDB")
  }
  return { client, db }
}

export async function getUserByEmail(email) {
  try {
    console.log("DB: getUserByEmail called for:", email)
    const { db } = await connectToDatabase()

    const user = await db.collection("users").findOne({ email })
    console.log("DB: Found user by email:", user ? user._id.toString() : 'None')

    if (user) {
      return {
        ...user,
        id: user._id.toString(),
      }
    }

    return null
  } catch (error) {
    console.error("Database error in getUserByEmail:", error)
    throw error
  }
}

export async function createUser(userData) {
  try {
    const { name, email, password, provider = "credentials", providerId } = userData
    console.log("DB: Creating user:", { name, email, provider })

    const { db } = await connectToDatabase()

    const newUser = {
      name,
      email,
      password,
      provider,
      providerId,
      university: "",
      address: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("users").insertOne(newUser)

    const createdUser = {
      ...newUser,
      id: result.insertedId.toString(),
      _id: result.insertedId,
    }

    console.log("DB: User created successfully with ID:", createdUser.id)
    return createdUser
  } catch (error) {
    console.error("Database error in createUser:", error)
    throw error
  }
}

export async function getUserById(id) {
  try {
    console.log("DB: getUserById called for ID (string):", id)
    // Ensure ID is a valid ObjectId before querying
    if (!ObjectId.isValid(id)) {
      console.log("DB: Invalid ObjectId format for ID:", id);
      return null;
    }
    const objectId = new ObjectId(id)
    const { db } = await connectToDatabase()

    const user = await db.collection("users").findOne({ _id: objectId })
    console.log("DB: Found user by ID:", user ? user._id.toString() : 'None')

    if (user) {
      return {
        ...user,
        id: user._id.toString(),
      }
    }

    return null
  } catch (error) {
    console.error("Database error in getUserById:", error)
    throw error
  }
}

export async function updateUserProfile(id, profileData) {
  try {
    console.log("DB: updateUserProfile called with ID (string):", id);
    // Ensure ID is a valid ObjectId before querying
    if (!ObjectId.isValid(id)) {
      console.log("DB: Invalid ObjectId format for ID in updateUserProfile:", id);
      throw new Error("Invalid user ID format"); // Throw error for invalid ID
    }
    const objectId = new ObjectId(id);
    console.log("DB: Converted ID to ObjectId for update:", objectId);

    const { db } = await connectToDatabase()

    const updateData = {
      ...profileData,
      updatedAt: new Date(),
    }
    // Ensure we don't try to update the _id itself
    delete updateData.id; // Remove string 'id' if it somehow got into profileData
    delete updateData._id; // Remove ObjectId '_id' if it somehow got into profileData
    console.log("DB: Update data prepared:", updateData);

    const result = await db
      .collection("users")
      .findOneAndUpdate(
        { _id: objectId }, // Query by ObjectId
        { $set: updateData },
        { returnDocument: "after" } // Return the updated document
      )

    console.log('DB: Raw result from findOneAndUpdate:', result);

    // CRITICAL CHANGE: Check if result.value exists, or if the result object itself contains the _id
    const updatedDocument = result.value || result; // Use result.value if present, otherwise use result itself

    if (updatedDocument && updatedDocument._id) { // Ensure it's a valid document with an _id
      console.log('DB: findOneAndUpdate successful. Updated document ID:', updatedDocument._id.toString());
      return {
        ...updatedDocument,
        id: updatedDocument._id.toString(),
      }
    }

    console.log('DB: updateUserProfile - No document found to update for ID:', id);
    throw new Error("User not found or could not be updated"); // More specific error
  } catch (error) {
    console.error("Database error in updateUserProfile (caught in DB layer):", error);
    throw error // Re-throw to be caught by the API route's try/catch
  }
}

export async function saveResetToken(userId, token, expiresAt) {
  try {
    console.log("DB: saveResetToken called for userId:", userId);
    if (!ObjectId.isValid(userId)) {
      console.log("DB: Invalid ObjectId format for userId in saveResetToken:", userId);
      throw new Error("Invalid user ID format");
    }
    const objectId = new ObjectId(userId);
    const { db } = await connectToDatabase()

    await db.collection("password_resets").insertOne({
      userId: objectId, // Store as ObjectId
      token,
      expiresAt,
      createdAt: new Date(),
    })
    console.log("DB: Reset token saved for userId:", userId);
  } catch (error) {
    console.error("Database error in saveResetToken:", error)
    throw error
  }
}

export async function getUserByResetToken(token) {
  try {
    console.log("DB: getUserByResetToken called for token:", token);
    const { db } = await connectToDatabase()

    const resetRecord = await db.collection("password_resets").findOne({
      token,
      expiresAt: { $gt: new Date() },
    })

    if (!resetRecord) {
      console.log("DB: No valid reset record found for token:", token);
      return null
    }

    // Query user using the userId from the reset record (which is an ObjectId)
    const user = await db.collection("users").findOne({ _id: resetRecord.userId })
    console.log("DB: Found user by reset token:", user ? user._id.toString() : 'None');

    if (user) {
      return {
        ...user,
        id: user._id.toString(),
      }
    }

    return null
  } catch (error) {
    console.error("Database error in getUserByResetToken:", error)
    throw error
  }
}

export async function updateUserPassword(userId, hashedPassword) {
  try {
    console.log("DB: updateUserPassword called for userId:", userId);
    if (!ObjectId.isValid(userId)) {
      console.log("DB: Invalid ObjectId format for userId in updateUserPassword:", userId);
      throw new Error("Invalid user ID format");
    }
    const objectId = new ObjectId(userId);
    const { db } = await connectToDatabase()

    const result = await db.collection("users").updateOne(
      { _id: objectId },
      {
        $set: {
          password: hashedPassword,
          updatedAt: new Date(),
        },
      },
    )
    console.log("DB: updateUserPassword result:", result.modifiedCount);
    if (result.modifiedCount === 0) {
      console.log("DB: No document modified for password update. User ID:", userId);
      throw new Error("User not found or password not updated");
    }
  } catch (error) {
    console.error("Database error in updateUserPassword:", error)
    throw error
  }
}

export async function deleteResetToken(token) {
  try {
    console.log("DB: deleteResetToken called for token:", token);
    const { db } = await connectToDatabase()

    await db.collection("password_resets").deleteOne({ token })
    console.log("DB: Reset token deleted:", token);
  } catch (error) {
    console.error("Database error in deleteResetToken:", error)
    throw error
  }
}

export async function closeDatabase() {
  if (client) {
    await client.close()
    client = null
    db = null
  }
}