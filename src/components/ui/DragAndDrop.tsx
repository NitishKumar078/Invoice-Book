import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
import { useDroppable } from '@dnd-kit/core';
import xlsx from 'json-as-xlsx';
import { invoiceItem } from '@/DataModels/DataModels';
import { useDispatch } from 'react-redux';
import { updateSelectedHeaders } from '@/Store/Reducers/Settinginfo';
import { useSelector } from 'react-redux';

type Item = { value: string; label: string };

const initialColumns: Record<string, Item[]> = {
  Headers: [
    { value: 'invoiceId', label: 'Invoice Id' },
    { value: 'customerName', label: 'customer Name' },
    { value: 'company', label: 'company Name' },
    { value: 'phoneNo', label: 'phoneNo' },
    { value: 'E_waybillno', label: 'E_waybillno' },
    { value: 'Idate', label: 'Date (DOI)' },
    { value: 'gstid', label: 'gst' },
    { value: 'cadress', label: 'Address' },
    // { value: 'tableData', label: 'tableData' },
    // { value: 'gsttype', label: 'gsttype' }, indicatore was used normal gst or igst
    { value: 'taxAmount', label: 'Tax Amount' },
    { value: 'subtotalamt', label: 'Sub Total Amount' },
    { value: 'totalAmount', label: 'Total Amount' },
  ],
  'Selected Headers': [],
};

function DroppableColumn({
  id,
  items,
  children,
}: {
  id: string;
  items: string[];
  children: React.ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`p-4 bg-gray-200 rounded-md min-h-[120px] transition ${
        isOver ? 'ring-2 ring-blue-400' : ''
      }`}
    >
      <h2 className="text-lg font-semibold capitalize">{id}</h2>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col mt-4">{children}</div>
      </SortableContext>
    </div>
  );
}

interface DragAndDropProps {
  setshowdataLabel: React.Dispatch<React.SetStateAction<boolean>>;
  invoiceList: invoiceItem[];
}

const DragAndDrop = ({ setshowdataLabel, invoiceList }: DragAndDropProps) => {
  const selectedHeaders = useSelector(
    (state: any) => state.settings.selectedHeaders
  );
  const [columns, setColumns] = useState<Record<string, Item[]>>(() => {
    if (selectedHeaders && selectedHeaders.length > 0) {
      // Remove selected headers from initial "Headers" and add to "Selected Headers"
      const remainingHeaders = initialColumns.Headers.filter(
        (item) => !selectedHeaders.some((sel: Item) => sel.value === item.value)
      );
      return {
        Headers: remainingHeaders,
        'Selected Headers': selectedHeaders,
      };
    }
    return initialColumns;
  });
  const [activeId, setActiveId] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleSave_Download = () => {
    // Implement your save/download logic here
    console.log('Save/Download button clicked!');
    // Get selected columns from "Selected Headers"
    const selectedColumns = columns['Selected Headers'];

    // upadate selected headers in local storage
    // use the dispacth method to update the selected headers in the redux store
    dispatch(updateSelectedHeaders(selectedColumns)); // Dispatch the action to add user

    // Prepare columns for xlsx
    const xlsxColumns = selectedColumns.map((col: Item) => ({
      label: col.label,
      value: col.value,
    }));

    // Prepare content for xlsx
    const xlsxContent = invoiceList.map((invoice) => {
      const row: Record<string, any> = {};
      selectedColumns.forEach((col: Item) => {
        row[col.value] = (invoice as any)[col.value];
      });
      return row;
    });

    // Prepare data for xlsx
    const data = [
      {
        sheet: 'Invoices',
        columns: xlsxColumns,
        content: xlsxContent,
      },
    ];

    let settings = {
      fileName: 'MySpreadsheet', // Name of the resulting spreadsheet
      extraLength: 3, // A bigger number means that columns will be wider
      writeMode: 'writeFile', // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
      writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
      RTL: false, // Display the columns from right-to-left (the default value is false)
    };

    xlsx(data, settings);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

    const sourceCol = Object.keys(columns).find((col) =>
      columns[col as keyof typeof columns].some(
        (item: Item) => item.label === active.id
      )
    );
    // If over.id is not a column, find the column containing the over.id item
    let destCol = over.id as string;
    if (!(columns as Record<string, Item[]>)[destCol]) {
      destCol =
        Object.keys(columns).find((col) =>
          (columns as Record<string, Item[]>)[col].some(
            (item) => item.label === over.id
          )
        ) || destCol;
    }

    if (!sourceCol || !destCol) return;

    if (sourceCol === destCol) {
      const oldIndex = columns[sourceCol].findIndex(
        (item) => item.label === active.id.toString()
      );
      const newIndex = columns[sourceCol].findIndex(
        (item) => item.label === over.id.toString()
      );
      setColumns((prev) => ({
        ...prev,
        [sourceCol]: arrayMove(prev[sourceCol], oldIndex, newIndex),
      }));
    } else {
      setColumns((prev) => {
        const sourceItems = prev[sourceCol].filter(
          (item) => item.label !== String(active.id)
        );
        const destItems = [
          ...prev[destCol],
          prev[sourceCol].find((item) => item.label === String(active.id))!,
        ];
        return {
          ...prev,
          [sourceCol]: sourceItems,
          [destCol]: destItems,
        };
      });
    }
  };

  const handleClose = () => {
    setshowdataLabel(false);
  };

  console.log(columns);

  return (
    <div className="fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 overflow-y-auto transition-opacity duration-200">
      <div className="fixed top-1/2 right-12 flex flex-col gap-4 transform -translate-y-1/2">
        <button
          className="relative cursor-pointer inline-flex items-center justify-center rounded-lg bg-black px-5 py-2 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:bg-gray-900 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-black"
          onClick={handleSave_Download}
        >
          Save & Next
        </button>
        <button
          className="relative cursor-pointer inline-flex items-center justify-center rounded-lg bg-white px-5 py-2 text-base font-semibold text-black border border-gray-300 shadow transition-all duration-200 hover:bg-gray-100 hover:text-black hover:border-black hover:scale-105 focus:outline-none focus:ring-2 focus:ring-black"
          onClick={handleClose}
        >
          Close
        </button>
      </div>

      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-2 gap-4 mx-auto mt-10 w-3/5 ">
          {Object.entries(columns).map(([columnId, items]) => (
            <DroppableColumn
              key={columnId}
              id={columnId}
              items={items.map((item) => item.label)}
            >
              {items.map((item) => (
                <SortableItem key={item.label} id={item.label} />
              ))}
            </DroppableColumn>
          ))}
        </div>
        <DragOverlay>
          {activeId ? (
            <div className="p-2 bg-gray-200 rounded-md mt-2 shadow-lg">
              {activeId}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default DragAndDrop;
