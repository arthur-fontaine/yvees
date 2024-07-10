import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../shared/components/ui/table"
import { useDataBoard } from "../hooks/use-data-board";


const fakeData = [
  { nom: "Voyage A", id: "A001", etapes: 5, tempsMoyen: "2h 30m", status: "Actif" },
  { nom: "Voyage B", id: "B002", etapes: 3, tempsMoyen: "1h 15m", status: "Inactif" },
  { nom: "Voyage C", id: "C003", etapes: 4, tempsMoyen: "3h", status: "Actif" },
];

const fakeJourney = {
  id: 1,
  museumId: 1,
  name: 'Test Journey',
  createdAt: new Date(),
  updatedAt: new Date(),
  draft: true,
  averageVisitDuration: 120,
  journeySteps: [
    {
      id: 1,
      journeyId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
};
export function JourneyTable(){
  const data = useDataBoard()

    return (
    <Table>
        <TableHeader>
            <TableRow>
            <TableHead className="w-[100px]">Nom</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Nombre d’étapes</TableHead>
            <TableHead className="text-right">Temps Moyen</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
         {fakeData.map((data) => (
          <TableRow key={data.id}>
            <TableCell className="font-medium">{data.nom}</TableCell>
            <TableCell>{data.id}</TableCell>
            <TableCell>{data.etapes}</TableCell>
            <TableCell className="text-right">{data.tempsMoyen}</TableCell>
          </TableRow>
        ))}
        </TableBody>
    </Table>
)
}