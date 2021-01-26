import {Component, Input, OnInit} from '@angular/core';
import {NavigationItem} from '../../../layout/admin/navigation/navigation';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import { NavigateService } from 'src/app/servicio/navigate.service';
import { Usuario } from 'src/app/estructuras/usuario';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input() type: string;

  public navigation: any;
  breadcrumbList: Array<any> = [];
  public navigationList: Array<any> = [];

  constructor(private route: Router, public nav: NavigationItem, private titleService: Title, private navigateService: NavigateService) {
    this.type = 'theme2';
    this.setBreadcrumb();
    this.validarPerfil();
  }

  ngOnInit() {
    this.navigateService.getMenuS().subscribe(menus => {
      this.navigation = menus.data;
      if(this.navigation){
        let routerUrl: string;
        routerUrl = this.route.url;
        if (routerUrl && typeof routerUrl === 'string') {
          this.filterNavigation(routerUrl);
        }
      }
    });
  }

  setBreadcrumb() {
    let routerUrl: string;
    this.route.events.subscribe((router: any) => {
      routerUrl = router.urlAfterRedirects;
      if (routerUrl && typeof routerUrl === 'string') {
        this.breadcrumbList.length = 0;
        const activeLink = router.url;
        this.filterNavigation(activeLink);
      }
    });
  }

  filterNavigation(activeLink) {
    let result = [];
    let title = 'Welcome';
    if(this.navigation){
      this.navigation.forEach((a) => {
        if (a.type === 'item' && 'url' in a && a.url === activeLink) {
          result = [
            {
              url: ('url' in a) ? a.url : false,
              title: a.title,
              breadcrumbs: ('breadcrumbs' in a) ? a.breadcrumbs : true,
              type: a.type
            }
          ];
          title = a.title;
        } else {
          if (a.type === 'group' && 'children' in a) {
            a.children.forEach((b) => {
              if (b.type === 'item' && 'url' in b && b.url === activeLink) {
                result = [
                  {
                    url: ('url' in b) ? b.url : false,
                    title: b.title,
                    breadcrumbs: ('breadcrumbs' in b) ? b.breadcrumbs : true,
                    type: b.type
                  }
                ];
                title = b.title;
              } else {
                if (b.type === 'collapse' && 'children' in b) {
                  b.children.forEach((c) => {
                    if (c.type === 'item' && 'url' in c && c.url === activeLink) {
                      result = [
                        {
                          url: ('url' in b) ? b.url : false,
                          title: b.title,
                          breadcrumbs: ('breadcrumbs' in b) ? b.breadcrumbs : true,
                          type: b.type
                        },
                        {
                          url: ('url' in c) ? c.url : false,
                          title: c.title,
                          breadcrumbs: ('breadcrumbs' in c) ? c.breadcrumbs : true,
                          type: c.type
                        }
                      ];
                      title = c.title;
                    } else {
                      if (c.type === 'collapse' && 'children' in c) {
                        c.children.forEach((d) => {
                          if (d.type === 'item' && 'url' in d && d.url === activeLink) {
                            result = [
                              {
                                url: ('url' in b) ? b.url : false,
                                title: b.title,
                                breadcrumbs: ('breadcrumbs' in b) ? b.breadcrumbs : true,
                                type: b.type
                              },
                              {
                                url: ('url' in c) ? c.url : false,
                                title: c.title,
                                breadcrumbs: ('breadcrumbs' in c) ? c.breadcrumbs : true,
                                type: c.type
                              },
                              {
                                url: ('url' in d) ? d.url : false,
                                title: d.title,
                                breadcrumbs: ('breadcrumbs' in c) ? d.breadcrumbs : true,
                                type: d.type
                              }
                            ];
                            title = d.title;
                          }
                        });
                      }
                    }
                  });
                }
              }
            });
          }
        }
      });
    }
    this.navigationList = result;
    this.titleService.setTitle(title + ' | Centro de emprendimiento');
  }

  clase = "";

  validarPerfil(){
    let usuario = Usuario.getUser();
    if(usuario.emprendedor == 1){
      this.clase = 'blue';
    }
    if(usuario.asistencia_tecnica == 1){
      this.clase = 'blue';
    }
    if(usuario.mentor == 1) {
      this.clase = 'blue';
    }
    if(usuario.administrador == 1) {
      this.clase = '';
    }
    if(usuario.mesa_servicio == 1) {
      this.clase = '';
    }

  }

}
