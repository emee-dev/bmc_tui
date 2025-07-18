import { donorNames } from "@/lib/data";
import { useEffect, useMemo, useState } from "react";

// export function useSimulatedDonors(count: number = 30) {
//   const [donors, setDonors] = useState<string[]>([]);

//   useEffect(() => {
//     let i = 0;
//     let id: NodeJS.Timeout | null = null;

//     function addNextDonor() {
//       if (i >= count) return;
//       if (count === 0) return;

//       const randomName =
//         donorNames[Math.floor(Math.random() * donorNames.length)];
//       setDonors((prev) => [...prev, randomName]);

//       i++;

//       const randomDelay = Math.random() * 2000 + 500; // 0.5s - 2.5s
//       id = setTimeout(addNextDonor, randomDelay);
//     }

//     addNextDonor();

//     // optional cleanup on unmount
//     return () => {
//       if (id) {
//         clearTimeout(id);
//       }
//     };
//   }, [count]);

//   return donors;
// }

type DonorActionType = "bought" | "donated";

export interface DonorEvent {
  id: string;
  name: string;
  type: DonorActionType;
  amount: number;
  unit: "coffee" | "USD";
}

function getRandomDonorEvent(): DonorEvent {
  const name = donorNames[Math.floor(Math.random() * donorNames.length)];

  const type: DonorActionType = Math.random() > 0.4 ? "bought" : "donated";
  const amount =
    type === "bought"
      ? Math.ceil(Math.random() * 3) // 1 to 3 coffees
      : parseFloat((Math.random() * 10 + 1).toFixed(2)); // $1 to $11

  return {
    id: crypto.randomUUID(),
    name,
    type,
    amount,
    unit: type === "bought" ? "coffee" : "USD",
  };
}

// export function useSimulatedDonors(count: number = 30) {
//   const [donors, setDonors] = useState<DonorEvent[]>([]);

//   useEffect(() => {
//     let i = 0;
//     let timeoutId: NodeJS.Timeout | null = null;

//     function addNextDonor() {
//       if (i >= count) return;

//       const newDonor = getRandomDonorEvent();
//       setDonors((prev) => [...prev, newDonor]);

//       i++;
//       const randomDelay = Math.random() * 2000 + 500; // 0.5s - 2.5s
//       timeoutId = setTimeout(addNextDonor, randomDelay);
//     }

//     addNextDonor();

//     return () => {
//       if (timeoutId) clearTimeout(timeoutId);
//     };
//   }, [count]);

//   return donors;
// }

export function useSimulatedDonors(count: number = 30) {
  const [donors, setDonors] = useState<DonorEvent[]>([]);

  useEffect(() => {
    let i = 0;
    let timeoutId: NodeJS.Timeout | null = null;

    function addNextDonor() {
      if (i >= count) return;

      const newDonor = getRandomDonorEvent();
      setDonors((prev) => [...prev, newDonor]);

      i++;
      const randomDelay = Math.random() * 2000 + 500; // 0.5s - 2.5s
      timeoutId = setTimeout(addNextDonor, randomDelay);
    }

    addNextDonor();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [count]);

  const totalAmt = useMemo(() => {
    const total = donors.reduce((sum, donor) => {
      return sum + (donor.type === "bought" ? donor.amount * 5 : donor.amount);
    }, 0);
    return Number(total.toFixed(2));
  }, [donors]);

  return { donors, totalAmt };
}
