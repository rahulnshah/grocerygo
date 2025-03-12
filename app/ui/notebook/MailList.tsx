'use client';

import { useState } from "react";
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { fetchItems } from "@/app/lib/data";
import { ItemForm } from "@/app/lib/definitions";
import jsPDF from "jspdf";
export function MailList({ list_title, id }: { list_title: string, id: string }) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      // Fetch list details from API
      const items: ItemForm[] = await fetchItems(id);

      // Create a new PDF document
      const doc = new jsPDF(
        {
          orientation: 'portrait', // Keep it portrait
          unit: 'mm',             // Use millimeters for better control
          format: [100, 140]      // Custom width & height (100mm wide, 140mm tall)}
        });

      // Load the image
      const img = new Image();
      img.src = "notebook_paper.png"; // Ensure this is the correct path
      // Set title as a heading
      img.onload = () => {
        // Add the image as a background
        doc.addImage(img, 'PNG', 0, 0, 100, 140);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text(list_title, 10, 20);

        // Add list items
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        items.forEach((item, index) => {
          const y = 30 + index * 10; // Adjust vertical spacing
          const start = 15; // the starting pt of each item name in pdf 
          if (item.isChecked) {
            // Draw a line over the text to create a strikethrough effect
            const textWidth = doc.getTextWidth(item.name);
            doc.text(item.name, start, y);
            doc.line(start, y - 1.5, start + textWidth, y - 1.5); // Strikethrough line
          } else {
            doc.text(`• ${item.name}`, start, y);
          }
        });

        // Save the PDF file
        doc.save(`${list_title.replace(/\s+/g, "_")}.pdf`);
      }
    } catch (error) {
      console.error("Error downloading list:", error);
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleDownload}
      className="p-2 rounded-full text-gray-600 hover:text-orange-500 hover:bg-gray-100 transition-colors"
      disabled={loading}
    >
      <ArrowDownTrayIcon className="h-5 w-5" />
    </button>
  );
}
