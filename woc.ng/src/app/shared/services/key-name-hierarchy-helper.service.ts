import { KeyValueNode } from '../models/key-value-node';

export interface KeyNameItem { keyNamePath: string; name: string; }


export class KeyNameHierarchyHelperService {

    public getChildsByKeyNamePathHelper(allItems: KeyNameItem[], keyNamePath: string): KeyNameItem[] {

        const ret = allItems.filter(l =>
            (l.keyNamePath !== keyNamePath)
            && (l.keyNamePath.startsWith(keyNamePath + ';'))
        );
        return ret;
    }

    public getDirectChildsByKeyNamePathHelper(allItems: KeyNameItem[], keyNamePath: string): KeyNameItem[] {
        const ret = allItems.filter(l =>
            (l.keyNamePath !== keyNamePath)
            && (l.keyNamePath.startsWith(keyNamePath))
            && (this.getLevel(keyNamePath) + 1 === this.getLevel(l.keyNamePath))
        );
        return ret;
    }

    public getRootItems(allItems: KeyNameItem[]) {
        const ret = allItems.filter(l => l.keyNamePath.split(';').length === 2);
        return ret;
    }

    public getBreadCrumpArray(allItems: KeyNameItem[], child: KeyNameItem): KeyNameItem[] {

        const ret = <KeyNameItem[]>[];
        let parentItem = <KeyNameItem>{};
        let parentKeyNamePath = this.getParentNameKeyPath(child.keyNamePath);
        while (parentKeyNamePath) {
            parentItem = allItems.find(i => i.keyNamePath === parentKeyNamePath);
            if (parentItem) {
                ret.push(parentItem);
            }
            parentKeyNamePath = this.getParentNameKeyPath(parentItem.keyNamePath);
        }
        return ret;
    }

    mapToKeyValueNodes(nameKeys: KeyNameItem[]): KeyValueNode {

        // const root = new KeyValueNode();
        // root.key = '';
        // root.value = 'root';
        // root.childs = [];

        // let prevChild = new KeyValueNode();

        // // key names must be sorted!
        // nameKeys.forEach(okn => {

        //     if ( prevChild.key === this.getLastNameKey(okn) ) {

        //     }


        // });

        return null;
    }

    private getLevel(keyNamePath: string) {
        const len = keyNamePath.split(';').length - 1;
        return len;
    }

    private getLastNameKeySegment(keyNamePath: string): string {
        const ret = keyNamePath.substring(0, keyNamePath.lastIndexOf(';'));
        return ret;
    }

    private getParentNameKeyPath(keyNamePath: string): string {
        const ret = keyNamePath.substring(0, keyNamePath.lastIndexOf(';'));
        return ret;
    }

}
