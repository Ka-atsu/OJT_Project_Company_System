import TextSlice from "./slices/TextSlice";
import MissionVisionSlice from "./slices/MissionVisionSlice";
import CoreValuesSlice from "./slices/CoreValuesSlice";
import CompanyProfileSlice from "./slices/CompanyProfileSlice";
import WhyUsSlice from "./slices/WhyUsSlice";

const RENDERERS = {
  text: TextSlice,
  missionVision: MissionVisionSlice,
  coreValues: CoreValuesSlice,
  companyProfile: CompanyProfileSlice,
  whyUs: WhyUsSlice,
};

export default function AboutSlice(props) {
  const Slice = RENDERERS[props.type] ?? TextSlice;
  return <Slice {...props} />;
}
