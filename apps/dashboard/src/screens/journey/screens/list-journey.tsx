import React from "react";
import { Button } from "../../../shared/components/ui/button";
import { Input } from "../../../shared/components/ui/input";
// import { Card, CardTitle, CardContent, CardHeader, CardFooter, CardDescription } from "../../../shared/components/ui/card";
import { Icon } from "ui";
import { router } from "../../../utils/router";
import { JourneyTable } from "../components/board";

/**
 * Journey List screen.
 */
export function JourneyList() {
  return (
    <>
      <div className="bg-white h-screen p-10">
        <h1 className="my-4">Liste des parcours en cours</h1>
        <div className="flex justify-between my-8">
          <Input className="w-auto" placeholder="Recherche.."></Input>
          <Button
            className={`gap-2 text-white hover:bg-white hover:text-orange hover:outline`}
              onClick={() => router.push("journeycreate")}
            variant="default"
          >
            Créer un parcours
            <Icon.Plus color="currentColor" size={24}></Icon.Plus>
          </Button>
        </div>
        <JourneyTable />
        {/* <Card>
        <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Card Content</p>
        </CardContent>
        <CardFooter>
            <p>Card Footer</p>
        </CardFooter>
        </Card> */}
      </div>
    </>
  );
}
