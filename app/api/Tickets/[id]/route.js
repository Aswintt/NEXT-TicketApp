import Ticket from "@/app/(models)/Ticket";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const foundTicket = await Ticket.findOne({ _id: id });
    return NextResponse.json({ foundTicket }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    // if (!id) throw new Error("ID not found in parameters");
    // console.log("Deleting item with ID:", id);
    const result = await Ticket.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json(
        { error: "No ticket found with the given ID" },
        { status: 404 }
      );
    } else {
      return NextResponse.json({ message: "Ticket Deleted" }, { status: 200 });
    }
  } catch (error) {
    // console.error("Error in DELETE handler:", error.message);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const ticketData = body.formData;
    // if (!id) throw new Error("ID not found in parameters");
    // console.log("Deleting item with ID:", id);
    const result = await Ticket.findByIdAndUpdate(id, {
      ...ticketData,
    });
    // console.log("put ran", ticketData);
    if (!result) {
      return NextResponse.json(
        { error: "No ticket found with the given ID" },
        { status: 404 }
      );
    } else {
      return NextResponse.json({ message: "Ticket Updated" }, { status: 200 });
    }
  } catch (error) {
    // console.error("Error in DELETE handler:", error.message);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
