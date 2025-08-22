import React from "react";
import { useUsage } from "../../../context/usageProvider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignUpModal() {
  const { openModal, setOpenModal } = useUsage();

  return (
    <Dialog
      open={openModal}
      onOpenChange={() =>
        openModal ? setOpenModal(!openModal) : setOpenModal(openModal)
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>🚀 Unlock unlimited AI-Powered content!</DialogTitle>
          <br />

          <DialogDescription>
            🎉 Congrats! You have generated 10,000 words with our AI tool. That
            is amazing!
          </DialogDescription>

          <DialogDescription>
            🔒 Ready to take your content creation to the next level? Upgrade to
            a paid plan and enjoy!
          </DialogDescription>

          <ul className="m-5 list-disc list-inside">
            <li>✨ Unlimited word generation</li>
            <li>🧠 Advanced AI features</li>
            <li>⚡ Faster processing times</li>
            <li>🛠️ Priority customer support</li>
          </ul>

          <DialogDescription>
            💡 Do not let your creativity hit a wall. Upgrade now and keep the
            ideas flowing!
          </DialogDescription>

          <div className="m-5 text-center">
            <Link href="/membership">
              <Button>Join Membership</Button>
            </Link>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
