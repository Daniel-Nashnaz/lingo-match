"use client";
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAppContext } from "@/context/AppContext";
import { motion } from "framer-motion";
import PopoverInfo from "./popoverInfo";
import { settingsInfo } from "@/data/settingGame";

export default function SettingsTab() {
  const { gameSettings, updateGameSettings } = useAppContext();
  const [activePopover, setActivePopover] = useState<string | null>(null);

  const settings = settingsInfo(gameSettings, updateGameSettings);

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {settings.map((setting) => (
        <motion.div
          key={setting.id}
          className="flex items-center justify-between p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="space-y-0.5">
            <div className="flex items-center space-x-2">
              <Label htmlFor={setting.id} className="text-lg font-semibold">
                {setting.title}
              </Label>
              <PopoverInfo
                description={setting.description}
                details={setting.details}
                isOpen={activePopover === setting.id}
                onOpenChange={(open) =>
                  setActivePopover(open ? setting.id : null)
                }
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {setting.description}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <motion.div
              animate={{ rotate: setting.checked ? 360 : 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl"
            >
              {setting.emoji}
            </motion.div>
            <Switch
              id={setting.id}
              checked={setting.checked}
              onCheckedChange={(checked) => {
                setting.onChange(checked);
              }}
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
