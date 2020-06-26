import { customElement, internalProperty, LitElement, html, property } from 'lit-element';
import appStyles from './todo-app-styles';

interface ITaskItem {
    id: string;
    title: string;
    completed?: boolean;
}

@customElement('todo-app')
export class TodoAppElement extends LitElement {
    constructor() {
        super();
    }

    static get styles() {
        return appStyles;
    }

    @property()
    get isAllCompleted(): boolean {
        return this.tasks.every(i => i.completed);
    }

    @property()
    get tasksPending(): number {
        return this.tasks.filter(i => !i.completed).length;
    }

    @internalProperty()
    tasks: ITaskItem[] = [];

    private handleAdd(e: KeyboardEvent) {
        if (e.key !== 'Enter') {
            return;
        }
        const input: HTMLInputElement = e.target as any;
        const newTaskTitle = input.value;
        if (this.tasks.findIndex(i => i.title === newTaskTitle) > -1) {
            return;
        }
        this.tasks.push({ id: (new Date().getTime()).toString(), title: newTaskTitle });
        input.value = '';
        this.tasks = this.tasks.slice();
    }

    private markAllAsComplete(e: Event) {
        const inputElement: HTMLInputElement = e.target as any;
        const completed = inputElement.checked;
        this.tasks = this.tasks.map(i => {
            return { ...i, completed };
        });
    }

    private markTaskAsComplete(e: Event) {
        const inputElement: HTMLInputElement = e.target as any;
        const { id } = inputElement.dataset;
        const task = this.tasks.find(i => i.id === id);
        if (!task) {
            return;
        }
        task.completed = inputElement.checked;
        this.tasks = this.tasks.slice();
    }

    removeTask(e: Event) {
        const inputElement: HTMLButtonElement = e.target as any;
        const { id } = inputElement.dataset;
        this.tasks = this.tasks.filter(i => i.id !== id);
    }

    private renderTask({ id, title, completed }: ITaskItem) {
        return html`
            <li class="task ${completed && 'completed'}">
                <div>
                    <input  data-id="${id}" type="checkbox"
                    class="toggle" .checked=${completed}
                    @change="${this.markTaskAsComplete}">
                    <label>${title}</label>
                    <button data-id="${id}" class="destroy" @click="${this.removeTask}"></button>
                </div>        
            </li>            
        `;
    }

    private renderFooter() {
        return html`
            <footer class="footer">
                <span class="todo-count style-scope td-todos">
                    <strong>${this.tasksPending}</strong>
                    <span >item</span><span> left</span>
                </span>
                <ul class="filters">
                    <li route="" >
                        <a href="#/" class="selected style-scope td-todos">All</a>
                    </li>
                    <li route="active" >
                        <a href="#/active" >Active</a>
                    </li>
                    <li route="completed" >
                        <a href="#/completed" >Completed</a>
                    </li>
                </ul>
			</footer>
        `;
    }

    render() {
        return html`
        <div class="todoapp">
            <header>
				<h1>todos</h1>
			</header>
            <section class="todoapp">
                <header class="header">
                    <input name="newTodo" class="new-todo" placeholder="What needs to be done?"
                    @keyup="${this.handleAdd}" autofocus/>
                </header>
                <section class="main">
                    <input id="toggle-all" class="toggle-all" type="checkbox"
                    .checked="${this.isAllCompleted}" @change="${this.markAllAsComplete}" >
                    <label for="toggle-all">Mark all as complete</label>
                    <ul class="todo-list">
                        ${this.tasks.map(t => this.renderTask(t))}
                    </ul>
                </section>
               ${this.renderFooter()}
            </section>
        </div>
        `;
    }

}