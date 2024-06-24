"use server";

import { db } from "@/db";
import {
  CaseFinish,
  CaseMaterial,
  PhoneColor,
  PhoneModel,
} from "@prisma/client";

export type SaveConfigArgs = {
  color: PhoneColor;
  finish: CaseFinish;
  model: PhoneModel;
  material: CaseMaterial;
  configId: string;
};

export async function saveConfig({
  color,
  finish,
  model,
  material,
  configId,
}: {
  color: PhoneColor;
  finish: CaseFinish;
  model: PhoneModel;
  material: CaseMaterial;
  configId: string;
}) {
  await db.configuration.update({
    where: { id: configId },
    data: {
      color,
      finish,
      model,
      material,
    },
  });
}
