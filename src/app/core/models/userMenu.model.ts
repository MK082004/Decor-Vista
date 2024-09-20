export class UserMenuModel{
  MenuId: number;
  MenuName: string;
  MenuIcon: string;
  MenuUrl: string;
  CanView: boolean;
  CanEdit: boolean;
  CanDelete: boolean;
  CanCreate: boolean;
  IsActive: boolean;
  SortOrder: number;
  SubMenus: UserSubMenuModel[] = [];
}

export class UserSubMenuModel {
  SubMenuId: number;
  ParentMenuId: string;
  SubMenuName: string;
  SubMenuIcon: string;
  SubMenuUrl: string;
  CanView: boolean;
  CanEdit: boolean;
  CanDelete: boolean;
  CanCreate: boolean;
  IsActive: boolean;
  SortOrder: number;
}
