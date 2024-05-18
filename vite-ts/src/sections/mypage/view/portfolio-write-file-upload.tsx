// import Grid from "@mui/material/Grid";
// import TextField from "@mui/material/TextField";
// import { useCallback } from "react";

// import { Upload } from "src/components/upload";

// type Props = {
//   entry : {
//     title: string;
//     program: string;
//     contribution: string;
//     content: string;
//     file: File | string | null;
//     firstDropdownValue: string;
//     secondDropdownValue: string;
//     image: number;
//   }
// }

// export default function PortfolioWriteFileUpload({entry}:Props) {
//   const handleDropSingleFile = useCallback((index:number, acceptedFiles: File[]) => {
//     const newFile = acceptedFiles[0];
//     if (newFile) {
//       setFile(
//         Object.assign(newFile, {
//           preview: URL.createObjectURL(newFile),
//         }), index
//       );
//     }
//   }, []);

//   const setFile = (file:Entry['file'], index:number) => {
//     setEntries(prevEntries => prevEntries.map((entry, idx) =>
//       idx === index ? { ...entry, file } : entry
//     ));
//   }

//   return (
//     <>
//         <Grid item xs={12} md={6}>
//           <Upload
//             accept={{ 'image/*': [] }}
//             file={entry.file}
//             onDrop={(acceptedFiles) => handleDropSingleFile(index, acceptedFiles)} onDelete={() => setFile(null, index)}
//           />
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <TextField
//             fullWidth
//             label="작품 제목"
//             variant="outlined"
//             value={entry.title}
//             onChange={handleChange(index, 'title')}
//             sx={{ mb: 2 }}
//           />
//           <TextField
//             fullWidth
//             label="사용 프로그램"
//             variant="outlined"
//             value={entry.program}
//             onChange={handleChange(index, 'program')}
//             sx={{ mb: 2 }}
//           />
//           <TextField
//             fullWidth
//             label="작업 파트"
//             variant="outlined"
//             value={entry.contribution}
//             onChange={handleChange(index, 'contribution')}
//             sx={{ mb: 2 }}
//           />
//           <TextField
//             fullWidth
//             label="작업 내용"
//             variant="outlined"
//             value={entry.content}
//             onChange={handleChange(index, 'content')}
//             multiline
//             rows={4}
//           />
//         </Grid>
//       </>
//   )
// }


// {/* <>
//         <Grid item xs={12} md={6}>
//           <Upload
//             accept={{ 'image/*': [] }}
//             file={entry.file}
//             onDrop={(acceptedFiles) => handleDropSingleFile(index, acceptedFiles)} onDelete={() => setFile(null, index)}
//           />
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <TextField
//             fullWidth
//             label="작품 제목"
//             variant="outlined"
//             value={entry.title}
//             onChange={handleChange(index, 'title')}
//             sx={{ mb: 2 }}
//           />
//           <TextField
//             fullWidth
//             label="사용 프로그램"
//             variant="outlined"
//             value={entry.program}
//             onChange={handleChange(index, 'program')}
//             sx={{ mb: 2 }}
//           />
//           <TextField
//             fullWidth
//             label="작업 파트"
//             variant="outlined"
//             value={entry.contribution}
//             onChange={handleChange(index, 'contribution')}
//             sx={{ mb: 2 }}
//           />
//           <TextField
//             fullWidth
//             label="작업 내용"
//             variant="outlined"
//             value={entry.content}
//             onChange={handleChange(index, 'content')}
//             multiline
//             rows={4}
//           />
//         </Grid>
//       </> */}
