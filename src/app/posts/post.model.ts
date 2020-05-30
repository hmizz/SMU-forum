export interface Post {
    id: string;
    title: string;
    content: string;
    topic: string;
    publisher: {name:string, id: string};
    comments: string[];
  }