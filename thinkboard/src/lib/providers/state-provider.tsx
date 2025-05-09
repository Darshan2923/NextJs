'use client';
import {
    Dispatch,
    FC,
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useMemo,
    useReducer,
} from 'react';
import { File, Folder, workspace } from '../supabase/supabase.types';
import { redirect, usePathname } from 'next/navigation';
import { getFiles } from '../supabase/queries';
import { validate } from 'uuid';

export type appFoldersType = Folder & { files: File[] | [] };
export type appWorkspacesType = workspace & {
    folders: appFoldersType[] | [];
};

export interface AppState {
    workspaces: appWorkspacesType[] | [];
}

type Action =
    | { type: 'SET_WORKSPACES'; payload: [] | appWorkspacesType[] }
    | { type: 'ADD_WORKSPACE'; payload: appWorkspacesType }
    | { type: 'DELETE_WORKSPACE'; payload: string }
    | { type: 'TRASH_WORKSPACE'; payload: string }
    | { type: 'RESTORE_WORKSPACE'; payload: string }
    | {
        type: 'SET_FOLDERS';
        payload: { workspaceId: string; folders: [] | appFoldersType[] };
    }
    | {
        type: 'ADD_FOLDER';
        payload: { workspaceId: string; folder: appFoldersType };
    }
    | {
        type: 'DELETE_FOLDER';
        payload: { folderId: string };
    }
    | { type: 'TRASH_FOLDER'; payload: { id: string; message: string } }
    | { type: 'RESTORE_FOLDER'; payload: string }
    | {
        type: 'SET_FILES';
        payload: { workspaceId: string; folderId: string; files: [] | File[] };
    }
    | {
        type: 'ADD_FILE';
        payload: { workspaceId: string; folderId: string; file: File };
    }
    | {
        type: 'DELETE_FILE';
        payload: { workspaceId: string; folderId: string; fileId: string };
    }
    | { type: 'TRASH_FILE'; payload: { fileId: string; message: string } }
    | { type: 'RESTORE_FILE'; payload: { folderId: string; fileId: string } }
    | {
        type: 'UPDATE_EMOJI';
        payload: {
            id: string; // ID of the workspace, folder, or file to update
            emoji: string; // New emoji value
            type: 'workspace' | 'folder' | 'file'; // Type of entity to update
        };
    }
    | {
        type: 'UPDATE_TITLE';
        payload: {
            id: string;
            title: string;
            type: 'workspace' | 'folder' | 'file';
        };
    }
    | {
        type: 'UPDATE_DATA';
        payload: {
            id: string;
            data: string;
            type: 'workspace' | 'folder' | 'file';
        };
    }
    | {
        type: 'UPDATE_WORKSPACE_DATA';
        payload: { workspaceId: string; workspace: Partial<workspace> };
    }
    | {
        type: 'UPDATE_FOLDER_DATA';
        payload: {
            workspaceId: string;
            folderId: string;
            folder: Partial<Folder>;
        };
    }
    | {
        type: 'UPDATE_FILE_DATA';
        payload: {
            workspaceId: string;
            folderId: string;
            fileId: string;
            file: Partial<File>;
        };
    };

const initialState: AppState = { workspaces: [] };
// Reducer function
const appReducer = (
    state: AppState = initialState,
    action: Action
): AppState => {
    switch (action.type) {
        case 'SET_WORKSPACES': {
            return {
                ...state,
                workspaces: action.payload,
            };
        }
        case 'ADD_WORKSPACE':
            return {
                ...state,
                workspaces: [...state.workspaces, action.payload],
            };
        case 'DELETE_WORKSPACE':
            return {
                ...state,
                workspaces: state.workspaces.filter(
                    (workspace) => workspace.id !== action.payload
                ),
            };
        case 'TRASH_WORKSPACE':
            return {
                ...state,
                workspaces: state.workspaces.map((workspace) => {
                    if (workspace.id === action.payload) {
                        return {
                            ...workspace,
                            inTrash: 'In Trash',
                            folders: workspace.folders.map((folder) => ({
                                ...folder,
                                inTrash: 'In Trash',
                                files: folder.files.map((file) => ({
                                    ...file,
                                    inTrash: 'In Trash',
                                })),
                            })),
                        };
                    } else {
                        return workspace;
                    }
                }),
            };
        case 'SET_FOLDERS': {
            return {
                ...state,
                workspaces: state.workspaces.map((workspace) => {
                    if (workspace.id === action.payload.workspaceId) {
                        return {
                            ...workspace,
                            folders: action.payload.folders.sort(
                                (a, b) =>
                                    new Date(a.createdAt ?? 0).getTime() - new Date(b.createdAt ?? 0).getTime()
                            ),
                        };
                    }
                    return workspace;
                }),
            };
        }
        case 'ADD_FOLDER':
            return {
                ...state,
                workspaces: state.workspaces.map((workspace) => {
                    return {
                        ...workspace,
                        folders: [...workspace.folders, action.payload.folder].sort(
                            (a, b) =>
                                new Date(a.createdAt ?? 0).getTime() - new Date(b.createdAt ?? 0).getTime()
                        ),
                    };
                }),
            };
        case 'DELETE_FOLDER':
            return {
                ...state,
                workspaces: state.workspaces.map((workspace) => {
                    const updatedFolders = workspace.folders.filter(
                        (folder) => folder.id !== action.payload.folderId
                    );

                    if (updatedFolders.length !== workspace.folders.length) {
                        // If the folder was removed, create a new workspace with the updated folders
                        return {
                            ...workspace,
                            folders: updatedFolders,
                        };
                    }

                    return workspace;
                }),
            };
        case 'TRASH_FOLDER':
            return {
                ...state,
                workspaces: state.workspaces.map((workspace) => ({
                    ...workspace,
                    folders: workspace.folders.map((folder) => {
                        if (folder.id === action.payload.id) {
                            return {
                                ...folder,
                                inTrash: action.payload.message,
                                files: folder.files.map((file) => ({
                                    ...file,
                                    inTrash: action.payload.message,
                                })),
                            };
                        } else {
                            return folder;
                        }
                    }),
                })),
            };
        case 'RESTORE_FOLDER':
            return {
                ...state,
                workspaces: state.workspaces.map((workspace) => ({
                    ...workspace,
                    folders: workspace.folders.map((folder) => {
                        if (folder.id === action.payload) {
                            return {
                                ...folder,
                                inTrash: '',
                                files: folder.files.map((file) => ({ ...file, inTrash: '' })),
                            };
                        }
                        return folder;
                    }),
                })),
            };
        case 'SET_FILES': {
            return {
                ...state,
                workspaces: state.workspaces.map((workspace) => {
                    if (workspace.id === action.payload.workspaceId) {
                        return {
                            ...workspace,
                            folders: workspace.folders.map((folder) => {
                                if (folder.id === action.payload.folderId) {
                                    return {
                                        ...folder,
                                        files: action.payload.files,
                                    };
                                }
                                return folder;
                            }),
                        };
                    }
                    return workspace;
                }),
            };
        }
        case 'ADD_FILE':
            return {
                ...state,
                workspaces: state.workspaces.map((workspace) => {
                    if (workspace.id === action.payload.workspaceId) {
                        return {
                            ...workspace,
                            folders: workspace.folders.map((folder) => {
                                if (folder.id === action.payload.folderId) {
                                    return {
                                        ...folder,
                                        files: [...folder.files, action.payload.file].sort(
                                            (a, b) =>
                                                new Date(a.createdAt ?? 0).getTime() -
                                                new Date(b.createdAt ?? 0).getTime()
                                        ),
                                    };
                                }
                                return folder;
                            }),
                        };
                    }
                    return workspace;
                }),
            };
        case 'DELETE_FILE':
            return {
                ...state,
                workspaces: state.workspaces.map((workspace) => {
                    if (workspace.id === action.payload.workspaceId) {
                        return {
                            ...workspace,
                            folders: workspace.folders.map((folder) => {
                                if (folder.id === action.payload.folderId) {
                                    return {
                                        ...folder,
                                        files: folder.files.filter(
                                            (file) => file.id !== action.payload.fileId
                                        ),
                                    };
                                }
                                return folder;
                            }),
                        };
                    }
                    return workspace;
                }),
            };
        case 'TRASH_FILE':
            return {
                ...state,
                workspaces: state.workspaces.map((workspace) => ({
                    ...workspace,
                    folders: workspace.folders.map((folder) => ({
                        ...folder,
                        files: folder.files.map((file) => {
                            if (file.id === action.payload.fileId) {
                                return {
                                    ...file,
                                    inTrash: action.payload.message,
                                };
                            } else {
                                return file;
                            }
                        }),
                    })),
                })),
            };
        case 'RESTORE_FILE':
            return {
                ...state,
                workspaces: state.workspaces.map((workspace) => ({
                    ...workspace,
                    folders: workspace.folders.map((folder) => {
                        if (folder.id === action.payload.folderId) {
                            return {
                                ...folder,
                                files: folder.files.map((file) => {
                                    if (file.id === action.payload.fileId) {
                                        return { ...file, inTrash: '' };
                                    }
                                    return file;
                                }),
                            };
                        }
                        return folder;
                    }),
                })),
            };
        case 'UPDATE_EMOJI':
            return {
                ...state,
                workspaces: state.workspaces.map((workspace) => {
                    if (
                        workspace.id === action.payload.id &&
                        action.payload.type === 'workspace'
                    ) {
                        return {
                            ...workspace,
                            iconId: action.payload.emoji,
                        };
                    } else {
                        return {
                            ...workspace,
                            folders: workspace.folders.map((folder) => {
                                if (
                                    folder.id === action.payload.id &&
                                    action.payload.type === 'folder'
                                ) {
                                    return {
                                        ...folder,
                                        iconId: action.payload.emoji,
                                    };
                                } else {
                                    return {
                                        ...folder,
                                        files: folder.files.map((file) => {
                                            if (
                                                file.id === action.payload.id &&
                                                action.payload.type === 'file'
                                            ) {
                                                return {
                                                    ...file,
                                                    iconId: action.payload.emoji,
                                                };
                                            }
                                            return file;
                                        }),
                                    };
                                }
                            }),
                        };
                    }
                }),
            };
        case 'UPDATE_TITLE':
            return {
                ...state,
                workspaces: state.workspaces.map((workspace) => {
                    if (
                        workspace.id === action.payload.id &&
                        action.payload.type === 'workspace'
                    ) {
                        return {
                            ...workspace,
                            title: action.payload.title,
                        };
                    } else {
                        return {
                            ...workspace,
                            folders: workspace.folders.map((folder) => {
                                if (
                                    folder.id === action.payload.id &&
                                    action.payload.type === 'folder'
                                ) {
                                    return {
                                        ...folder,
                                        title: action.payload.title,
                                    };
                                } else {
                                    return {
                                        ...folder,
                                        files: folder.files.map((file) => {
                                            if (
                                                file.id === action.payload.id &&
                                                action.payload.type === 'file'
                                            ) {
                                                return {
                                                    ...file,
                                                    title: action.payload.title,
                                                };
                                            }
                                            return file;
                                        }),
                                    };
                                }
                            }),
                        };
                    }
                }),
            };
        case 'UPDATE_DATA': {
            const { id, data, type } = action.payload;
            return {
                ...state,
                workspaces: state.workspaces.map((workspace) => {
                    if (workspace.id === id && type === 'workspace') {
                        return {
                            ...workspace,
                            data,
                        };
                    } else {
                        return {
                            ...workspace,
                            folders: workspace.folders.map((folder) => {
                                if (folder.id === id && type === 'folder') {
                                    return {
                                        ...folder,
                                        data,
                                    };
                                } else {
                                    return {
                                        ...folder,
                                        files: folder.files.map((file) => {
                                            if (file.id === id && type === 'file') {
                                                return {
                                                    ...file,
                                                    data,
                                                };
                                            }
                                            return file;
                                        }),
                                    };
                                }
                            }),
                        };
                    }
                }),
            };
        }
        case 'UPDATE_WORKSPACE_DATA':
            return {
                ...state,
                workspaces: state.workspaces.map((workspace) => {
                    if (workspace.id === action.payload.workspaceId) {
                        return {
                            ...workspace,
                            ...action.payload.workspace,
                        };
                    }
                    return workspace;
                }),
            };
        case 'UPDATE_FOLDER_DATA':
            return {
                ...state,
                workspaces: state.workspaces.map((workspace) => {
                    if (workspace.id === action.payload.workspaceId) {
                        return {
                            ...workspace,
                            folders: workspace.folders.map((folder) => {
                                if (folder.id === action.payload.folderId) {
                                    return {
                                        ...folder,
                                        ...action.payload.folder,
                                    };
                                }
                                return folder;
                            }),
                        };
                    }
                    return workspace;
                }),
            };
        case 'UPDATE_FILE_DATA':
            return {
                ...state,
                workspaces: state.workspaces.map((workspace) => {
                    if (workspace.id === action.payload.workspaceId) {
                        return {
                            ...workspace,
                            folders: workspace.folders.map((folder) => {
                                if (folder.id === action.payload.folderId) {
                                    return {
                                        ...folder,
                                        files: folder.files.map((file) => {
                                            if (file.id === action.payload.fileId) {
                                                return {
                                                    ...file,
                                                    ...action.payload.file,
                                                };
                                            }
                                            return file;
                                        }),
                                    };
                                }
                                return folder;
                            }),
                        };
                    }
                    return workspace;
                }),
            };

        default:
            return state;
    }
};

const AppStateContext = createContext<
    | {
        state: AppState;
        dispatch: Dispatch<Action>;
        workspaceId: string | undefined;
        folderId: string | undefined;
        fileId: string | undefined;
    }
    | undefined
>(undefined);

interface AppStateProviderProps {
    children: ReactNode;
}

export const AppStateProvider: FC<AppStateProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    const pathname = usePathname();

    const workspaceId = useMemo(() => {
        const urlSegments = pathname?.split('/').filter(Boolean);
        if (urlSegments)
            if (urlSegments?.length > 1) {
                return urlSegments[1];
            }
    }, [pathname]);

    const folderId = useMemo(() => {
        const urlSegments = pathname?.split('/').filter(Boolean);
        if (urlSegments)
            if (urlSegments?.length > 2) {
                return urlSegments[2];
            }
    }, [pathname]);

    const fileId = useMemo(() => {
        const urlSegments = pathname?.split('/').filter(Boolean);
        if (urlSegments)
            if (urlSegments?.length > 3) {
                return urlSegments[3];
            }
    }, [pathname]);

    /**
     * THE FOLDERS ARE GOING TO BE STORED FROM THE TEMPDROPDOWN COMPONENT DIRECTLY BECAUSE
     * WE WANT IT TO COME FROM THE SERVER NOT FROM THE CLIENT
     */

    //Fetch Files for the folder when the url changes changes
    useEffect(() => {
        if (!folderId || !workspaceId) return;

        const fetchFiles = async () => {
            const { data: response, error } = await getFiles(folderId);
            if (error || !response) return;
            dispatch({
                type: 'SET_FILES',
                payload: { workspaceId, files: response, folderId },
            });
        };

        const findWorkspace = state.workspaces
            .find((w) => w.id === workspaceId)
            ?.folders.find((folder) => folder.id === folderId);
        if (!findWorkspace?.files.length) fetchFiles();
    }, [folderId, workspaceId, pathname]);

    useEffect(() => {
        console.log('STATE CHANGES', state);
    }, [state]);

    return (
        <AppStateContext.Provider
            value={{ state, dispatch, workspaceId, folderId, fileId }}
        >
            {children}
        </AppStateContext.Provider>
    );
};

export const useAppState = () => {
    const context = useContext(AppStateContext);
    if (!context) {
        throw new Error('useAppState must be used within an AppStateProvider');
    }
    return context;
};