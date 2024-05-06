import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';

import Image from 'src/components/image';

// ----------------------------------------------------------------------
// a(piece_id: number, fileUrl: string, type: string, name: string, create_at: Date)
function createDummyData(piece_id: number, fileUrl: string, type: string, name: string, create_at: Date, description: string,  nft_type: string, status:string) {
  const date:string = create_at.toLocaleDateString()
  return { piece_id, fileUrl, type, name, description, nft_type, status, date };
}

const dummy = [
  createDummyData(1, 'https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_1.jpg', 'PEN', '그림1', new Date('2024-05-03'), '그림 설명하기 귀찮아요...', 'NFT', 'PRIVATE'),
  createDummyData(2, '', 'STORY', '스토리1', new Date('2024-05-03'), '그림 설명하기 귀찮아요...', 'URL', 'PRIVATE'),
  createDummyData(3, 'https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_2.jpg', 'COLOR', '그림2', new Date('2024-05-03'), '그림 설명하기 귀찮아요...', 'URL', 'PUBLIC'),
  createDummyData(4, 'https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_3.jpg', 'BG', '그림3', new Date('2024-05-03'), '그림 설명하기 귀찮아요...', 'URL', 'PUBLIC'),
  createDummyData(5, 'https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_4.jpg', 'PD', '그림4', new Date('2024-05-03'), '그림 설명하기 귀찮아요...', 'URL', 'PUBLIC'),
  createDummyData(6, 'https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_5.jpg', 'CONT', '그림5', new Date('2024-05-03'), '그림 설명하기 귀찮아요...', 'URL', 'PRIVATE'),
  createDummyData(7, 'https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_6.jpg', 'PEN', '그림6', new Date('2024-05-03'), '그림 설명하기 귀찮아요...', 'URL', 'PUBLIC'),
  createDummyData(8, 'https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_7.jpg', 'PEN', '그림7', new Date('2024-05-03'), '그림 설명하기 귀찮아요...', 'URL', 'PRIVATE'),
  createDummyData(9, 'https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_8.jpg', 'PEN', '그림8', new Date('2024-05-03'), '그림 설명하기 귀찮아요...', 'NFT', 'PUBLIC'),
  createDummyData(10, 'https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_9.jpg', 'PEN', '그림9', new Date('2024-05-03'), '그림 설명하기 귀찮아요...', 'NFT', 'PRIVATE'),
  createDummyData(11, 'https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_10.jpg', 'PEN', '그림10', new Date('2024-05-03'), '그림 설명하기 귀찮아요...', 'NFT', 'PUBLIC'),
  createDummyData(12, 'https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_11.jpg', 'PEN', '그림11', new Date('2024-05-03'), '그림 설명하기 귀찮아요...', 'NFT', 'PUBLIC'),
];

type Props = {
    workId: string
}

export default function WorksDetail({workId}:Props) {
    const dummyData = dummy.find((item) => item.piece_id === parseInt(workId, 10))

  return (
    <>
        <Typography variant="h3" sx={{ mb: 5 }}>
            {dummyData?.name}
        </Typography>
        {dummyData?.fileUrl && <Image
            alt="gallery"
            ratio="1/1"
            src={dummyData?.fileUrl}
            padding={dummyData?.fileUrl ? 0 : 10}
        />}
        <Card>
            {dummyData?.description}
        </Card>
    </>
  );
}
