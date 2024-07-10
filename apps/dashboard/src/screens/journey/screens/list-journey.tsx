import React from "react";
import { Button } from "../../../shared/components/ui/button";
import { Icon } from "ui";
import { router } from "../../../utils/router";
import { JourneyCard } from "../components/card-journey";

/**
 * Journey List screen.
 */
export function JourneyList() {
  return (
    <>
      <div className="bg-white h-screen p-10">
        <div className="flex justify-between my-8">
          <h1 className="text-3xl font-bold">Liste des parcours en cours</h1>
          <Button
            className={`gap-2 text-white hover:bg-white hover:text-orange hover:outline`}
              onClick={() => router.push("journeycreate")}
            variant="default"
          >
            Créer un parcours
            <Icon.Plus color="currentColor" size={24}></Icon.Plus>
          </Button>
        </div>
        <JourneyCard />
      </div>
    </>
  );
}
