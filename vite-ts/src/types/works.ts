export type IWorksItem = {
  piece_id: number;
  name: string;
  type: string;
  status: 'PRIVATE' | 'PUBLIC';
  fileUrl: string;
  description: string;
  createdAt: Date;
};
