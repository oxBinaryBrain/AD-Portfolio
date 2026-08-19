export interface Project {
  id: string;
  number: string;
  title: string;
  titleLines: string[];
  image: string;
  tags: string[];
  description: string;
  highlight: string;
  link: string;
}

export interface CapsuleMetric {
  title: string;
  subtitle: string;
}

export interface SkillGroup {
  label: string;
  items: string[];
}