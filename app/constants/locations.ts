export const LOCATIONS = {
  TONY_GWYNN_STADIUM: "Tony Gwynn Stadium",
  STORM_HALL_WEST_111: "Storm Hall West 111",
  ENGINEERING_BUILDING_250: "Engineering Building 250",
  STUDENT_UNION_302: "Student Union 302",
  AZTEC_STUDENT_UNION: "Conrad Prebys Aztec Student Union",
} as const;

export type LocationName = (typeof LOCATIONS)[keyof typeof LOCATIONS];
