import { aboutIntro, ourTeam } from '../data/aboutContent.js';
import type { AboutSection, TeamMember } from '../types/types.js';
import { createElement } from '../ui/createElement.js';

function createTextSection(section: AboutSection, headingTag: 'h1' | 'h2'): HTMLElement {
  const block = createElement('section', 'about_section');

  block.append(createElement(headingTag, 'about_title', section.title));
  section.paragraphs.forEach((text) => {
    block.append(createElement('p', 'about_text', text));
  });

  return block;
}

function createMemberCard(member: TeamMember): HTMLElement {
  const card = createElement('article', 'about_member');
  const list = createElement('ul', 'about_tasks');

  member.tasks.forEach((task) => {
    list.append(createElement('li', 'about_task', task));
  });
  card.append(
    createElement('h3', 'about_member-name', member.name),
    createElement('p', 'about_member-role', member.role),
    list,
  );

  return card;
}

function createTeamSection(): HTMLElement {
  const block = createElement('section', 'about_section');
  const members = createElement('div', 'about_members');

  ourTeam.members.forEach((member) => {
    members.append(createMemberCard(member));
  });
  block.append(
    createElement('h2', 'about_title', ourTeam.title),
    createElement('p', 'about_text', ourTeam.intro),
    members,
    createElement('p', 'about_text', ourTeam.outro),
  );

  return block;
}

export function renderAboutPage(container: HTMLElement): void {
  const page = createElement('div', 'about');

  page.append(createTextSection(aboutIntro, 'h1'), createTeamSection());
  container.append(page);
}
