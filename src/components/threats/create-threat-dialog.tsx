"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  createThreatSchema,
  CreateThreatSchema,
} from "@/lib/schemas/create-threat-schema";

import { useCreateThreat } from "@/hooks/use-create-threat";

export function CreateThreatDialog() {
  const mutation =
    useCreateThreat();

  const form =
    useForm<CreateThreatSchema>({
      resolver:
        zodResolver(
          createThreatSchema
        ),
      defaultValues: {
        indicator: "",
        type: "IP",
        severity: 1,
      },
    });

  async function onSubmit(
    values: CreateThreatSchema
  ) {
    await mutation.mutateAsync(
      values
    );

    form.reset();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          New Threat
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Register Threat
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(
            onSubmit
          )}
          className="space-y-4"
        >
          <Input
            placeholder="Indicator"
            {...form.register(
              "indicator"
            )}
          />

          <Select
            value={form.watch(
              "type"
            )}
            onValueChange={(
              value
            ) =>
              form.setValue(
                "type",
                value as
                  | "IP"
                  | "DOMAIN"
                  | "HASH"
              )
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="IP">
                IP
              </SelectItem>

              <SelectItem value="DOMAIN">
                DOMAIN
              </SelectItem>

              <SelectItem value="HASH">
                HASH
              </SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="number"
            min={1}
            max={10}
            {...form.register(
              "severity",
              {
                valueAsNumber:
                  true,
              }
            )}
          />

          <Button
            type="submit"
            className="w-full"
          >
            Create Threat
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}