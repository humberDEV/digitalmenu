import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import MenuPersonalization from "./MenuPersonalization";
import PagePersonalization from "./PagePersonalization";

export default function Personalization({
  businessData,
  setBusinessData,
  themeConfig,
  setThemeConfig,
  isEditing,
  tab,
  setTab,
}) {
  return (
    <Tabs
      value={tab === 0 ? "menu" : "web"}
      onValueChange={(val) => setTab(val === "menu" ? 0 : 1)}
      className="w-full"
    >
      <TabsList className="bg-navy/80 border border-white/10">
        <TabsTrigger
          value="menu"
          disabled={isEditing && tab !== 0}
          className="text-white data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md"
        >
          Personalizar menú
        </TabsTrigger>
        <TabsTrigger
          value="web"
          disabled={isEditing && tab !== 1}
          className="text-white data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md"
        >
          Personalizar web
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value="menu"
        className="rounded-xl bg-navy/90 backdrop-blur-lg border border-white/10 p-6"
      >
        <MenuPersonalization
          themeConfig={themeConfig}
          setThemeConfig={setThemeConfig}
          isEditing={isEditing}
        />
      </TabsContent>

      <TabsContent
        value="web"
        className="rounded-xl bg-navy/90 backdrop-blur-lg border border-white/10 p-6"
      >
        <PagePersonalization
          businessData={businessData}
          setBusinessData={setBusinessData}
          isEditing={isEditing}
        />
      </TabsContent>
    </Tabs>
  );
}
