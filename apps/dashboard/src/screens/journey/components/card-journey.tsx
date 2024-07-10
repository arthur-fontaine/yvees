 
import React from "react"; 
import { useDataBoard } from "../hooks/use-data-card";
import { Card, CardTitle, CardContent, CardHeader, CardDescription } from "../../../shared/components/ui/card";
import { Icon } from "ui";
import type { JourneySerialized } from "../types/data-card";

 export function JourneyCard(){
  const { journey, loading } = useDataBoard();
  console.log(journey)
  if (loading) {
    return <p>Loading...</p>;
  }
  
  if (!journey || journey.length === 0) {
    return <p>No journeys available.</p>; // Show a message if there are no journeys
  }
  return (
    <div className="grid grid-cols-4 gap-4">
         {journey.map((data: JourneySerialized) => (
          <Card key={data.id} onClick={() => (console.log("route for journey"))} className="hover:bg-orangeLight">
            <CardHeader>
                <CardTitle className="flex justify-between text-1xl mb-4">
                    {data.name}
                    <Icon.Waypoints color="$orange" size={24} />
                </CardTitle>
                <CardDescription className="text-black min-h-10 line-clamp-2">{data.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between text-sm text-muted-foreground">
                    <p>Temps moyen :</p>
                    <p>{data.averageVisitDuration ? data.averageVisitDuration : "N/A"}</p>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                    <p>Nombres d'étapes :</p>
                    <p>{data.journeySteps.length}</p>  
                </div>
            </CardContent>
          </Card>
        ))}
    </div>
)
}
 
 
 

