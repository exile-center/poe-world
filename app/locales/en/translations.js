/* eslint-disable */
export default {
  components: {
    atlas: {
      popover_tier: 'Tier: {{tier}}',
      popover_area_level: 'Area Level: {{areaLevel}}',
      popover_pantheon: 'Pantheon: {{pantheon}}'
    },
    price: {
      undefined: 'Undefined pricing'
    },
    map_trade_list: {
      no_properties: 'No props.',
      no_explicit_mods: 'No explicit mods',
      corrupted: 'Corrupted',
      unidentified: 'Unidentified',
      item_quantity: '{{itemQuantity}} IIQ',
      item_rarity: '{{itemRarity}} IIR',
      monster_pack_size: '{{monsterPackSize}} MPS',
      sold_by: 'Sold by {{account}}',
      afk: 'AFK'
    },
    clipboard_button: {
      copy: 'Copy to clipboard',
      copied: 'Copied'
    },
    navigation: {
      atlas: 'Your atlas',
      stash: 'Your stash',
      trade: 'Trade',
      settings: 'Settings',
      authenticated: 'Authenticated',
      not_authenticated: 'Not authenticated'
    },
    authenticated_container: {
      warning_message: 'You need to set your authentication information in your settings to use this feature.',
      settings: 'Settings'
    },
    desktop_container: {
      warning_message: 'This feature is only available on the desktop version of PoeWorld.'
    },
    changelog_modal: {
      title: "What's up !"
    },
    release_banner: {
      new_release_warning: 'The version {{latestVersion}} is now available. (Currently on {{currentVersion}})',
      github_release: 'Changelog & download'
    },
    stash_setting: {
      included: 'Included',
      excluded: 'Excluded',
      not_supported: 'Not supported'
    },
    poe_ninja_credit: {
      credit: 'Pricing analytics powered by',
      poe_ninja: 'poe.ninja'
    },
    page: {
      home_page: {
        tiles: {
          atlas: 'Atlas',
          atlas_description: 'Map information and trading',
          stash: 'Stash',
          stash_description: 'Summary and stats from your own stash tabs',
          trade: 'Trade',
          trade_description: 'Custom pathofexile trade browser'
        },
        poe_world_on: {
          title: 'PoeWorld on…',
          web: 'The web',
          discord: 'Discord',
          github: 'GitHub',
          issue: 'Report an issue',
          releases: 'See previous releases'
        },
        useful_links: 'Useful links'
      },
      map_page: {
        tier: 'Tier',
        area_level: 'Area Level {{level}}',
        information: 'Information',
        stash: 'Stash',
        friends: 'Friends',
        trade: 'Trade',
        stats: 'Stats'
      },
      map_information_page: {
        drops_title: 'Notable drops',
        layout_title: 'Layout',
        layout_rating_A: 'The map has a consistent layout that can be reliably fully cleared with no backtracking.',
        layout_rating_B:
          'The map has an open layout with few obstacles, or has only short and well-connected side paths.',
        layout_rating_C:
          'The map has an open layout with many obstacles, or has long side paths that require backtracking.',
        boss_title: 'Boss',
        pantheon: 'Pantheon'
      },
      map_trade_page: {
        not_tradable_warning:
          'This map is not available in any kind of currency. Therefore, it is not possible to get it via trading.',
        total: {
          zero: 'No map found.',
          one: 'One map found.',
          other: '{{count}} maps found !'
        }
      },
      stash_page: {
        vendor_recipe: 'Vendor recipe',
        divination_summary: 'Divination summary'
      },
      vendor_recipe_page: {
        missing_stashes_selection: 'To use this feature, you need to select which stash tabs you want to track.',
        missing_stashes_button: 'Configure',
        chromatic_title: 'Chromatic',
        jeweller_title: 'Jeweller',
        divine_title: 'Divine',
        chaos_title: 'Chaos / Regal',
        item_count: {
          zero: 'No item',
          one: '1 item',
          other: '{{count}} items'
        },
        hand: 'Hand',
        helmet: 'Helmet',
        chest: 'Chest armor',
        belt: 'Belt',
        boots: 'Boots',
        amulet: 'Amulet',
        gloves: 'Gloves',
        ring: 'Ring',
        summary: 'Summary'
      },
      divination_summary_page: {
        missing_stashes_selection: 'To use this feature, you need to select which stash tabs you want to track.',
        missing_stashes_button: 'Configure',
        title: 'Divination summary',
        no_divination_card_found: 'No divination card card has been found in your tabs.',
        card_name: 'Card name',
        card_result: 'Card result',
        stock_quantity: 'Stock quantity',
        unit_value: 'Unit value',
        total_value: 'Total value',
        stack_count: {
          zero: 'No complete stack',
          one: '1 complete stack',
          other: '{{count}} complete stacks'
        }
      },
      settings_page: {
        global: 'Global',
        stash_tabs: 'Stash tabs'
      },
      settings_global_page: {
        leagues_title: 'Active league',
        authentication_title: 'pathofexile.com authentication',
        account_label: 'Account name',
        poesessid_label: 'Session cookie (POESESSID)',
        authenticated: 'Authenticated',
        not_authenticated: 'Not authenticated',
        danger_title: 'Danger Zone',
        open_dev_tools: 'Open chrome developer tools'
      },
      settings_stash_tabs_page: {
        title: 'Stash tabs',
        stash_name: 'Stash name',
        stash_type: 'Stash type',
        vendor_recipe: 'Vendor recipe',
        divination_summary: 'Divination cards summary'
      },
      trade_page: {
        label_placeholder: 'Label',
        notes_placeholder: 'Notes',
        tags_placeholder: 'Tags',
        cancel: 'Cancel',
        save: 'Save',
        edit: 'Edit',
        delete: 'Delete',
        duplicate: 'Duplicate',
        update: 'Update',
        revert: 'Revert',
        trades_title: 'Your trades',
        search_placeholder: 'Search…',
        search_helper: 'Multiple terms can be separated with a comma.',
        create: 'New trade query',
        updated_at: 'Updated {{timeAgo}}'
      }
    }
  },
  services: {
    toaster: {
      unexpected_error: 'An unexpected error occurred. Try again later.'
    }
  }
};
/* eslint-enable */
