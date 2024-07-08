import React, { useState } from "react";
import { Button } from "../../../shared/components/ui/button";

/**
 * Journey Create screen.
 */
export function JourneyCreate() {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="bg-white h-screen p-10">
        <h1 className="my-4">Creation d'un parcours</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="journeyName">
              Name
            </label>
            <input
              id="journeyName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter journey name"
            />
          </div>
          <Button
            type="submit"
            className="gap-2 text-white hover:bg-white hover:text-orange hover:outline"
            variant="default"
          >
            Valider
          </Button>
        </form>
      </div>
    </>
  );
}
