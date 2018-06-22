import { KeyValueNode } from '../models/key-value-node';

export interface KeyNameItem { keyNamePath: string; name: string; }
export interface PrimeNode {
    label: string;
    data: string;
    expandedIcon: string;
    collapsedIcon: string;
    children: PrimeNode[];
 }



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

    public buildKeyValueNodeHierarchy(allItems: KeyNameItem[], parentNode: KeyValueNode, items: KeyNameItem[]) {
        items.forEach(item => {
          const childNode = new KeyValueNode();
          childNode.key = item.keyNamePath;
          childNode.value = item.name;
          childNode.children = [];
          parentNode.children.push(childNode);

          const childItems: KeyNameItem[] = this.getDirectChildsByKeyNamePathHelper(allItems, item.keyNamePath);
          this.buildKeyValueNodeHierarchy(allItems, childNode, childItems);
        });
        return parentNode;
      }

    public transformToPrimeNGTreeNode(children: KeyValueNode[]) {
        const childs: PrimeNode[] = children.map(child => <PrimeNode>{
                label: child.value,
                collapsedIcon: '',
                expandedIcon: '',
                data: child.key,
                children: this.transformToPrimeNGTreeNode(child.children)
        });
        return childs;
    }

    checkParentInChild(item: KeyNameItem, allItems: KeyNameItem[]) {
        if (
            !allItems.find(i => i.keyNamePath === item.keyNamePath)
            &&
            !allItems.find(i => item.keyNamePath.startsWith(i.keyNamePath))
            &&
            !allItems.find(i => i.keyNamePath.startsWith(item.keyNamePath))
          ) {
            return true;
          }
          return false;
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
