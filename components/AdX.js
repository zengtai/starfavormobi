import { useEffect } from "react";
import { DEV_MODE, SHOW_AD } from "@/lib/constants";

export default function AdX({ slot }) {
  // Next.js Component for Google Publisher Tag
  console.log("AdX", slot);
  useEffect(() => {
    window.googletag = window.googletag || { cmd: [] };
    googletag.cmd.push(function () {
      googletag.defineSlot(slot.unit_id, slot.sizes, slot.slot_id).addService(googletag.pubads());

      // Enable this to test ads
      DEV_MODE ? googletag.pubads().set("adsense_test_mode", "on") : null;
      //
      googletag.pubads().enableSingleRequest();
      googletag.pubads().collapseEmptyDivs();
      googletag.enableServices();

      //
      googletag.cmd.push(function () {
        googletag.display(slot.slot_id);
      });
    });
    return () => {
      googletag.cmd.push(function () {
        googletag.destroySlots();
      });
    };
  });
  return (
    <>
      <div
        id={slot.slot_id}
        className="my-4 mx-auto flex justify-center"
        style={{ minWidth: slot.sizes[0], minHeight: slot.sizes[1] }}
      ></div>
    </>
  );
}
