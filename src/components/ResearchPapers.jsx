"use client";

export default function ResearchPapers() {
  const papers = [
  {
    id: 1,
    title: "Attention Is All You Need",
    author: "Ashish Vaswani et al., Google Brain",
    link: "https://arxiv.org/abs/1706.03762",
  },
  {
    id: 2,
    title: "ImageNet Classification with Deep Convolutional Neural Networks",
    author: "Alex Krizhevsky, University of Toronto",
    link: "https://papers.nips.cc/paper_files/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html",
  },
  {
    id: 3,
    title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
    author: "Jacob Devlin et al., Google AI",
    link: "https://arxiv.org/abs/1810.04805",
  },
  {
    id: 4,
    title: "The Unreasonable Effectiveness of Data",
    author: "Alon Halevy, Peter Norvig, Google",
    link: "https://research.google/pubs/pub35179/",
  },
  {
    id: 5,
    title: "Playing Atari with Deep Reinforcement Learning",
    author: "Volodymyr Mnih et al., DeepMind",
    link: "https://arxiv.org/abs/1312.5602",
  },
  {
    id: 6,
    title: "A Survey on Deep Learning in Medical Image Analysis",
    author: "Geert Litjens et al., Radboud University",
    link: "https://www.sciencedirect.com/science/article/pii/S1361841517301135",
  },
  {
    id: 7,
    title: "GPT-3: Language Models are Few-Shot Learners",
    author: "Tom B. Brown et al., OpenAI",
    link: "https://arxiv.org/abs/2005.14165",
  },
  {
    id: 8,
    title: "The Elements of Statistical Learning",
    author: "Trevor Hastie, Robert Tibshirani, Stanford University",
    link: "https://web.stanford.edu/~hastie/ElemStatLearn/",
  },
];


  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-12">
        Recommended Research Papers
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {papers.map((paper) => (
          <div
            key={paper.id}
            className="bg-white rounded-lg shadow hover:shadow-lg p-6 transition-all duration-300 border border-gray-100"
          >
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              {paper.title}
            </h3>
            <p className="text-gray-600 mb-4">By: {paper.author}</p>
            <a
              href={paper.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition"
            >
              Read Full Paper
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
