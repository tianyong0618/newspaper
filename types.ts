export interface TabloidContent {
  mainTitle: string;
  subtitle: string;
  introduction: {
    title: string;
    content: string;
  };
  mainArticle: {
    title: string;
    content: string;
  };
  poem: {
    title: string;
    author: string;
    content: string[];
  };
  slogans: {
    title: string;
    items: string[];
  };
  knowledgeCorner: {
    title: string;
    content: string;
  };
  illustrationIdeas: {
    title: string;
    items: Array<{
      description: string;
      svgPath: string;
    }>;
  };
}