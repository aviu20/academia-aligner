import { useState } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { UNIVERSITIES } from "@/data/universityData";

interface UniversitySelectorProps {
  selectedIds: string[];
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  maxSelections?: number;
}

export function UniversitySelector({ 
  selectedIds, 
  onAdd, 
  onRemove,
  maxSelections = 3 
}: UniversitySelectorProps) {
  const [open, setOpen] = useState(false);

  const selectedUniversities = UNIVERSITIES.filter(uni => selectedIds.includes(uni.id));
  const availableUniversities = UNIVERSITIES.filter(uni => !selectedIds.includes(uni.id));

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
              disabled={selectedIds.length >= maxSelections}
            >
              {selectedIds.length === 0 ? "Select university..." : `${selectedIds.length} selected`}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Command>
              <CommandInput placeholder="Search universities..." />
              <CommandList>
                <CommandEmpty>No university found.</CommandEmpty>
                <CommandGroup>
                  {availableUniversities.map((university) => (
                    <CommandItem
                      key={university.id}
                      value={university.name}
                      onSelect={() => {
                        onAdd(university.id);
                        if (selectedIds.length + 1 >= maxSelections) {
                          setOpen(false);
                        }
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedIds.includes(university.id) ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <div className="flex flex-col">
                        <span className="font-medium">{university.name}</span>
                        <span className="text-sm text-muted-foreground">{university.location}</span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {selectedUniversities.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedUniversities.map((university) => (
            <Badge key={university.id} variant="secondary" className="pl-3 pr-1 py-1.5">
              <span className="mr-2">{university.name}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-5 w-5 p-0 hover:bg-transparent"
                onClick={() => onRemove(university.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}

      {selectedIds.length >= maxSelections && (
        <p className="text-sm text-muted-foreground">
          Maximum {maxSelections} universities can be selected for comparison
        </p>
      )}
    </div>
  );
}
