export interface ApiResponse<T> {
    readonly status: boolean;
    readonly statuscode: number;
    readonly message: string;
    readonly data: T;
    readonly timestamp: string;
}

export interface AboutData {
    readonly firstname: string;
    readonly lastname: string;
    readonly image: string;
    readonly about_text: string;
    readonly phone_number: string;
    readonly email: string;
    readonly github_link: string;
    readonly telegram_link: string;
    readonly instagram_link: string;
}

export interface Project {
    readonly id: number;
    readonly project_name: string;
    readonly project_image: string;
    readonly project_description: string;
    readonly project_link?: string;
    readonly project_github_link?: string;
    readonly created_at: string;
}

export interface Question {
    readonly name: string;
    readonly email: string;
    readonly message: string;
    readonly answer?: string;
    readonly created_at?: string;
}

export interface StatusState {
    readonly type: 'success' | 'danger' | 'info' | 'warning';
    readonly msg: string;
}
