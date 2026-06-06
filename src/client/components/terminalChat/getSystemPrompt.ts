import type { User } from '@/src/shared/types';

export function getSystemPrompt(user: User): string {
	const pronoun = {
		subject: user.pronouns[0], // he
		object: user.pronouns[1], // him
		possessive: user.pronouns[2], // his
	};

	const capabilities = user.capabilities
		.map((c) => `  ${c.label}: ${c.values.join(', ')}`)
		.join('\n');

	const experiences = user.experiences
		.map(
			(e) =>
				`  Role: ${e.role}
  Company: ${e.company}
  Duration: ${e.time}
  Location: ${e.location}
  Responsibilities:
${e.responsibilities.map((r) => `    - ${r}`).join('\n')}`,
		)
		.join('\n\n');

	const projects = user.projects
		.map(
			(p) =>
				`  Title: ${p.title}
  Description: ${p.description}
  Stack: ${p.stack.join(', ')}
  Demo: ${p.demoUrl}
  Source: ${p.sourceUrl}`,
		)
		.join('\n\n');

	const skills = user.skillGroups.map((s) => `  ${s.category}: ${s.skills.join(', ')}`).join('\n');

	const socials = user.socials
		.map((s) => `  Platform: ${s.name} | URL: ${s.url} | Username: @${s.username}`)
		.join('\n');

	const education = user.education
		.map(
			(e) =>
				`  Degree: ${e.degree}
  School: ${e.school}
  Duration: ${e.time}
  Score: ${e.score}`,
		)
		.join('\n\n');

	const achievements = user.achievements.map((a) => `  - ${a}`).join('\n');

	return `
You are a personal assistant for ${user.name}. Your sole purpose is to answer questions about ${user.name} based strictly on the information provided below.

RULES:
- Only answer questions related to ${user.name} — ${pronoun.possessive} background, skills, experience, projects, education, or achievements.
- If asked anything unrelated (general knowledge, coding help, other people, opinions, etc.), respond with: "I can only answer questions about ${user.name}. Feel free to ask me anything about ${pronoun.possessive} background, skills, or projects!"
- Do not make up, infer, or assume anything beyond what is explicitly provided below.
- Use the correct pronouns when referring to ${user.name}: "${pronoun.subject}" / "${pronoun.object}" / "${pronoun.possessive}".
- Keep answers concise, friendly, and professional.

---

PERSONAL INFO

  Name: ${user.name}
  Gender: ${user.gender}
  Pronouns: ${user.pronouns.join(' / ')}
  Current Role: ${user.role}
  Current Company: ${user.company}

  Short Introduction:
  ${user.shortIntro}

  Bio:
  ${user.bio}

---

CAPABILITIES

${capabilities}

---

SKILL GROUPS

${skills}

---

WORK EXPERIENCE

${experiences}

---

PROJECTS

${projects}

---

EDUCATION

${education}

---

ACHIEVEMENTS

${achievements}

---

SOCIALS & LINKS

${socials}
  `.trim();
}
