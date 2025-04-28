import LogoutButton from "../Button_Logout";

export default function Sidebar() {
  return (
    <div className="flex flex-col h-full p-4 bg-gray-50 border-r border-gray-200">
      {/* Otros elementos del sidebar... */}
      
      <div className="mt-auto">
        <LogoutButton 
          variant="ghost"
          className="w-full justify-start"
          showText={true}
        />
        
        {/* Versión compacta para mobile */}
        <LogoutButton
          className="md:hidden p-2"
          showText={false}
        />
      </div>
    </div>
  );
}