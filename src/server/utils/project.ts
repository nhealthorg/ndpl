import { useDatabase } from "#imports";
import { ProjectSchema, type Project } from '#shared/schema'

export const useProject = () => {
	const { getDatabase } = useDatabase()
  	const db = getDatabase()

	async function getProjectById(id: string | undefined) {
		const project = await db.prepare("SELECT * FROM project WHERE id = ?").get(id);
		return validateData<Project>(project, ProjectSchema);
	}

	async function getProject() {
		const projects = await db.prepare("SELECT * FROM project").all();
		return validateData<Project[]>(projects, ProjectSchema);
	}

	async function createProject(project: Project) {
		const valProject = validateData<Project>(project, ProjectSchema, false);
		if(valProject){
		await db.prepare("INSERT INTO project (name, description) VALUES (?, ?)").run(valProject.name, valProject.description);
		}
		return valProject;
	}

	async function updateProject(project: Project) {
		const valProject = validateData<Project>(project, ProjectSchema, false);
		if(valProject){
			await db.prepare("UPDATE project SET name = ?, description = ? WHERE id = ?").run(valProject.name, valProject.description, valProject.id);
		}
		return valProject;
	}

	async function deleteProject(id: string) {
		await db.prepare("DELETE FROM project WHERE id = ?").run(id);
	}

	return {
		getProjectById,
		getProject,
		createProject,
		updateProject,
		deleteProject
	}
}