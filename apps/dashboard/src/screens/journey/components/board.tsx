// import React from 'react'

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '../../../shared/components/ui/table'
// // import { useDataBoard } from "../hooks/use-data-board";

// const fakeData = [
//   { etapes: 5, id: 'A001', nom: 'Voyage A', status: 'Actif', tempsMoyen: '2h 30m' },
//   { etapes: 3, id: 'B002', nom: 'Voyage B', status: 'Inactif', tempsMoyen: '1h 15m' },
//   { etapes: 4, id: 'C003', nom: 'Voyage C', status: 'Actif', tempsMoyen: '3h' },
// ]

// const fakeJourney = {
//   averageVisitDuration: 120,
//   createdAt: new Date(),
//   draft: true,
//   id: 1,
//   journeySteps: [
//     {
//       createdAt: new Date(),
//       id: 1,
//       journeyId: 1,
//       updatedAt: new Date(),
//     },
//   ],
//   museumId: 1,
//   name: 'Test Journey',
//   updatedAt: new Date(),
// }
// /**
//  *  Journey Table component.
//  */
// export function JourneyTable() {
//     return (
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead className="w-[100px]">Nom</TableHead>
//             <TableHead>ID</TableHead>
//             <TableHead>Nombre d’étapes</TableHead>
//             <TableHead className="text-right">Temps Moyen</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {fakeData.map(data => (
//             <TableRow key={data.id}>
//               <TableCell className="font-medium">{data.nom}</TableCell>
//               <TableCell>{data.id}</TableCell>
//               <TableCell>{data.etapes}</TableCell>
//               <TableCell className="text-right">{data.tempsMoyen}</TableCell>
//             </TableRow>
//         ))}
//         </TableBody>
//       </Table>
//     )
// }
