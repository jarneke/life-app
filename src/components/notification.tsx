import { Text } from "@/components/text";
import { useRouter } from "next/router";

interface Notification {
  id: string;
  icon: React.ReactNode;
  message: string;
  importance?: number;
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
  const router = useRouter();

  const handleClick = () => {
    if (notification.redirectUrl) {
      router.push(notification.redirectUrl);
    }
  };

  return (
    <button
      className={`self-stretch flex items-start justify-start gap-3 text-stone-100/50 ${className}`}
      onClick={handleClick}
    >
      {notification.icon}
      <Text className="" content={notification.message} />
      {notification.importance && (
        <Text
          className="text-stone-100/40"
          content={"!".repeat(notification.importance)}
        />
      )}
    </button>
  );
};
