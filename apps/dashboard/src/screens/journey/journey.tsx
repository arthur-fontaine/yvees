import React from "react";
import { Button } from "../../shared/components/ui/button";
import { Input } from "../../shared/components/ui/input";
import { JourneyTable } from "./components/board";
import { Icon } from "ui";

/**
 * Journey screen.
 */
export function Journey() {
  return (
    <>
      <div className="bg-white h-screen p-10">
        <h1 className="my-4">Liste des parcours en cours</h1>
        <div className="flex justify-between my-8">
          <Input className="w-auto" placeholder="Recherche.."></Input>
          <Button
            className={`gap-2 text-white hover:bg-white hover:text-orange hover:outline`}
            //   onClick={onClick}
            variant="default"
          >
            Créer un parcours
            <Icon.Plus color="currentColor" size={24}></Icon.Plus>
          </Button>
        </div>
        <JourneyTable />
      </div>
    </>
  );
}
