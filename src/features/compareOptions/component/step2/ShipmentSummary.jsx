// // ShipmentSummary.jsx
// import React from "react"

// export default function ShipmentSummary({ data }) {
//   return (
//     <div className="bg-card rounded-xl border p-5 shadow-sm md:col-span-7">
//       <h3 className="text-lg font-bold mb-3 text-primary">Shipment Summary</h3>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
//         <div>
//           <span className="font-semibold text-primary">Mode:</span> {data.mode || "—"}
//         </div>
//         <div>
//           <span className="font-semibold text-primary">Type:</span> {data.shipmentType || "—"}
//         </div>
//         <div>
//           <span className="font-semibold text-primary">Commodity:</span> {data.commodity || "—"}
//         </div>
//         <div>
//           <span className="font-semibold text-primary">Gross Weight:</span>{" "}
//           {data.grossWeight ? `${data.grossWeight} kg` : "—"}
//         </div>
//         <div>
//           <span className="font-semibold text-primary">Container:</span>{" "}
//           {data.containerType || "—"}
//         </div>
//         <div>
//           <span className="font-semibold text-primary">Pickup:</span> {data.pickupLocation || "—"}
//         </div>
//         {data.wizardSelection?.mainCategory && (
//           <div className="md:col-span-3">
//             <span className="font-semibold text-primary">Category:</span>{" "}
//             {data.wizardSelection.mainCategory} / {data.wizardSelection.subCategory}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
