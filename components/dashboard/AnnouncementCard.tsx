import { Button } from "@/components/ui";

export function AnnouncementCard() {
  return (
    <div className="rounded-xl bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 p-6 flex items-center justify-between">
      <div>
        <p className="text-purple-900 dark:text-purple-100 font-medium">
          Xin chào! Buổi học trực tuyến của bạn sắp bắt đầu!
        </p>
      </div>
      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
        Tham gia
      </Button>
    </div>
  );
}
