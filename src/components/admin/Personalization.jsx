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
    <div className="tabs tabs-lift tabs-lg">
      <input
        type="radio"
        name="my_tabs_3"
        className="tab"
        aria-label="Personalizar menú"
        defaultChecked
        disabled={isEditing && tab !== 0}
        onClick={() => setTab(0)}
      />
      <div className="tab-content bg-base-100 border-base-300 p-6">
        <MenuPersonalization
          themeConfig={themeConfig}
          setThemeConfig={setThemeConfig}
          isEditing={isEditing}
        />
      </div>

      {/* Tab para Datos de la Empresa */}
      <input
        type="radio"
        name="my_tabs_3"
        className="tab"
        aria-label="Personalizar web"
        disabled={isEditing && tab !== 1}
        onClick={() => setTab(1)}
      />
      <div className="tab-content bg-base-100 border-base-300 p-6">
        <PagePersonalization
          businessData={businessData}
          setBusinessData={setBusinessData}
          isEditing={isEditing}
        />
      </div>
    </div>
  );
}
