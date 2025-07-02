import TicketForm from "@/app/(components)/TicketForm";
const BASE_URL = process.env.APP_URL || "";

const getTicketById = async (id) => {
  const res = await fetch(`${BASE_URL}/api/Tickets/${id}`, {
    cache: "no-store",
  });
  // console.log("id", id);
  if (!res.ok) {
    // throw new Error("Failed to get tickets.");
    console.log("Failed to get tickets.");
  }
  return res.json();
};

const TicketPage = async ({ params }) => {
  const { id: ch } = await params; // Destructure `params.id` directly
  // console.log("ch value: ", ch);
  const EDITMODE = ch === "new" ? false : true;
  let updateTicketData = {};

  if (EDITMODE) {
    updateTicketData = await getTicketById(ch);
    // console.log(updateTicketData.foundTicket);
    updateTicketData = updateTicketData.foundTicket;
  } else {
    updateTicketData = {
      _id: "new",
    };
  }
  return <TicketForm ticket={updateTicketData} />;
};

export default TicketPage;
