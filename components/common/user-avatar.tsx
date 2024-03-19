import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface UserAvatarProps {
  src: string;
  name: string;
  fallback?: string;
}

export function UserAvatar({ src, name, fallback }: UserAvatarProps) {
  return (
    <Avatar>
      <AvatarImage src={src} alt={name} />
      <AvatarFallback>{fallback || name[0]}</AvatarFallback>
    </Avatar>
  );
}
