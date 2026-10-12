import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'fb-app-shell',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <div class="app-frame">
      <aside class="sidebar" [class.sidebar-open]="mobileNavOpen()">
        <a class="brand" routerLink="/dashboard" (click)="closeNav()">
          <span class="brand-mark">f</span><span>flowboard</span>
        </a>
        <div class="workspace-switcher">
          <span class="workspace-avatar">A</span>
          <span class="workspace-copy"><strong>Acme Studio</strong><small>Free workspace</small></span>
          <span class="chevron">⌄</span>
        </div>
        <p class="nav-label">WORKSPACE</p>
        <nav class="nav-list" aria-label="Main navigation">
          <a routerLink="/dashboard" routerLinkActive="active" (click)="closeNav()"><span class="nav-icon">◫</span> Overview</a>
          <a routerLink="/projects" routerLinkActive="active" (click)="closeNav()"><span class="nav-icon">▦</span> Projects</a>
          <a routerLink="/tasks" routerLinkActive="active" (click)="closeNav()"><span class="nav-icon">☷</span> My tasks <span class="nav-count">8</span></a>
        </nav>
        <p class="nav-label nav-label-spaced">MANAGE</p>
        <nav class="nav-list">
          <a href="javascript:void(0)" class="muted-link"><span class="nav-icon">♙</span> Team <span class="coming-soon">Soon</span></a>
          <a href="javascript:void(0)" class="muted-link"><span class="nav-icon">⚙</span> Settings</a>
        </nav>
        <div class="sidebar-bottom">
          <div class="upgrade-card"><span class="upgrade-spark">✦</span><strong>Make room for big ideas</strong><p>Bring your whole team into one focused workspace.</p><button type="button">Explore plans <span>↗</span></button></div>
          <div class="profile-row"><div class="profile-avatar">TS</div><div class="profile-copy"><strong>Tanuj Sharma</strong><small>Workspace admin</small></div><span class="profile-more">···</span></div>
        </div>
      </aside>
      @if (mobileNavOpen()) {
        <button class="mobile-backdrop" aria-label="Close navigation" (click)="closeNav()"></button>
      }
      <main class="main-panel">
        <header class="topbar">
          <button class="mobile-menu" type="button" aria-label="Open navigation" (click)="toggleNav()">☰</button>
          <div class="breadcrumbs"><span>Workspace</span><span class="crumb-slash">/</span><strong>Overview</strong></div>
          <div class="topbar-actions">
            <button class="icon-button" type="button" aria-label="Search">⌕</button>
            <button class="icon-button notification-button" type="button" aria-label="Notifications">♧<i></i></button>
            <div class="top-avatar">TS</div>
          </div>
        </header>
        <section class="page-area"><router-outlet /></section>
      </main>
    </div>
  `,
})
export class AppShellComponent {
  readonly mobileNavOpen = signal(false);
  toggleNav(): void { this.mobileNavOpen.update((value) => !value); }
  closeNav(): void { this.mobileNavOpen.set(false); }
}
