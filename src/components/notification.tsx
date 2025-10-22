import { Text } from "@/components/text";

interface Notification {
  id: string;
  icon: React.ReactNode;
  message: string;
  importance?: "low" | "medium" | "high";
  redirectUrl?: string;
}
interface NotificationProps {
  notification: Notification;
  className?: string;
}

export const Notification: React.FC<NotificationProps> = ({
  notification,
  className = "",
}) => {
  return (
    <div
      className={`self-stretch flex items-start justify-start gap-3 text-stone-100/50 ${className}`}
    >
      {notification.icon}
      <Text className="" content={notification.message} />
    </div>
  );
};
