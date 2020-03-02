import { Component, DoCheck, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../common/commonComponent';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent extends BaseComponent implements OnInit, DoCheck {
  public user: any;
  public accessPermission: any;
  public firstname: any;
  public lastname: any;
  public photo: any;
  constructor(inj: Injector) {
    super(inj);

  }

  isSidebarOpen: boolean;

  ngOnInit() {


    $('.asideleft-maximize .nav a').click(function () {
      const link = $(this);
      const closest_ul = link.closest('.asideleft-maximize ul');
      const parallel_active_links = closest_ul.find('.active');
      const closest_li = link.closest('li');
      const link_status = closest_li.hasClass('active');
      let count = 0;

      closest_ul.find('ul').slideUp('fast', () => {
        if (++count === closest_ul.find('ul').length) {
          parallel_active_links.removeClass('active');
        }
      });

      if (!link_status) {
        closest_li.children('ul').slideDown('fast');
        closest_li.addClass('active');
      }

    });
    // $(".asideleft-minimize .sidebar .nav-link").click( () => {
    //   console.log("clicked 111")
    //   $("#sideMenuToggle").trigger("click")
    // })
  }

  ngDoCheck(): void {
    this.firstname = this.getToken('firstname');
    this.lastname = this.getToken('lastname');
    // this.photo = this.getToken('photo');
  }

  checkSideNav(e) {
    //   // console.log("kkkk", $(".asideleft-minimize").length)
    //   if ($(".asideleft-minimize").length) {
    //     // console.log("triggering", $("#sideMenuToggle"))
    //     $("body").toggleClass("asideleft-minimize");
    //   }
  }

  asideLeftHide() {
    $('body').removeClass('asideleft-on');
  }

}
