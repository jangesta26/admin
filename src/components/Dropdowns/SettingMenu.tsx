import {
  ChartNoAxesCombined,
  ChevronDownCircleIcon,
  HeadsetIcon,
  Puzzle,
  User,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

const SettingMenu = () => {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-sm font-light rounded-xl flex items-center"
        >
            <ChevronDownCircleIcon
              className="w-6 h-6 transform transition-transform duration-300"
            />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`grid overflow-hidden w-56 bg-slate-100 dark:bg-black/90`}
      >
        <DropdownMenuLabel>My Details</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Personal Information</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Puzzle className="mr-2 h-4 w-4" />
            <Link href={`#something`}>Integrations</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <HeadsetIcon className="mr-2 h-4 w-4" />
            <Link href={`#something`}>Support</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Users className="mr-2 h-4 w-4" />
            <Link href={`#something`}>Organizations</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ChartNoAxesCombined className="mr-2 h-4 w-4" />
            <Link href={`#something`}>Advanced</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingMenu;
