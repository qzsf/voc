import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { ListPage } from '../list/list.page';
import { LetterPage } from '../letter/letter.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'list',
        children: [
          {
            path: '',
            component: ListPage
          },
          {
            path: 'letter/:id',
            loadChildren: () => import('../letter/letter.module').then(m => m.LetterPageModule)
          }
        ]

      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
