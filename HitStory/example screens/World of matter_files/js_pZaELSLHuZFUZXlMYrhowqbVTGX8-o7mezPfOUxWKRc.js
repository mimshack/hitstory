/* Chosen v1.0.0 | (c) 2011-2013 by Harvest | MIT License, https://github.com/harvesthq/chosen/blob/master/LICENSE.md */
!function(){var a,AbstractChosen,Chosen,SelectParser,b,c={}.hasOwnProperty,d=function(a,b){function d(){this.constructor=a}for(var e in b)c.call(b,e)&&(a[e]=b[e]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};SelectParser=function(){function SelectParser(){this.options_index=0,this.parsed=[]}return SelectParser.prototype.add_node=function(a){return"OPTGROUP"===a.nodeName.toUpperCase()?this.add_group(a):this.add_option(a)},SelectParser.prototype.add_group=function(a){var b,c,d,e,f,g;for(b=this.parsed.length,this.parsed.push({array_index:b,group:!0,label:this.escapeExpression(a.label),children:0,disabled:a.disabled}),f=a.childNodes,g=[],d=0,e=f.length;e>d;d++)c=f[d],g.push(this.add_option(c,b,a.disabled));return g},SelectParser.prototype.add_option=function(a,b,c){return"OPTION"===a.nodeName.toUpperCase()?(""!==a.text?(null!=b&&(this.parsed[b].children+=1),this.parsed.push({array_index:this.parsed.length,options_index:this.options_index,value:a.value,text:a.text,html:a.innerHTML,selected:a.selected,disabled:c===!0?c:a.disabled,group_array_index:b,classes:a.className,style:a.style.cssText})):this.parsed.push({array_index:this.parsed.length,options_index:this.options_index,empty:!0}),this.options_index+=1):void 0},SelectParser.prototype.escapeExpression=function(a){var b,c;return null==a||a===!1?"":/[\&\<\>\"\'\`]/.test(a)?(b={"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},c=/&(?!\w+;)|[\<\>\"\'\`]/g,a.replace(c,function(a){return b[a]||"&amp;"})):a},SelectParser}(),SelectParser.select_to_array=function(a){var b,c,d,e,f;for(c=new SelectParser,f=a.childNodes,d=0,e=f.length;e>d;d++)b=f[d],c.add_node(b);return c.parsed},AbstractChosen=function(){function AbstractChosen(a,b){this.form_field=a,this.options=null!=b?b:{},AbstractChosen.browser_is_supported()&&(this.is_multiple=this.form_field.multiple,this.set_default_text(),this.set_default_values(),this.setup(),this.set_up_html(),this.register_observers())}return AbstractChosen.prototype.set_default_values=function(){var a=this;return this.click_test_action=function(b){return a.test_active_click(b)},this.activate_action=function(b){return a.activate_field(b)},this.active_field=!1,this.mouse_on_container=!1,this.results_showing=!1,this.result_highlighted=null,this.result_single_selected=null,this.allow_single_deselect=null!=this.options.allow_single_deselect&&null!=this.form_field.options[0]&&""===this.form_field.options[0].text?this.options.allow_single_deselect:!1,this.disable_search_threshold=this.options.disable_search_threshold||0,this.disable_search=this.options.disable_search||!1,this.enable_split_word_search=null!=this.options.enable_split_word_search?this.options.enable_split_word_search:!0,this.group_search=null!=this.options.group_search?this.options.group_search:!0,this.search_contains=this.options.search_contains||!1,this.single_backstroke_delete=null!=this.options.single_backstroke_delete?this.options.single_backstroke_delete:!0,this.max_selected_options=this.options.max_selected_options||1/0,this.inherit_select_classes=this.options.inherit_select_classes||!1,this.display_selected_options=null!=this.options.display_selected_options?this.options.display_selected_options:!0,this.display_disabled_options=null!=this.options.display_disabled_options?this.options.display_disabled_options:!0},AbstractChosen.prototype.set_default_text=function(){return this.default_text=this.form_field.getAttribute("data-placeholder")?this.form_field.getAttribute("data-placeholder"):this.is_multiple?this.options.placeholder_text_multiple||this.options.placeholder_text||AbstractChosen.default_multiple_text:this.options.placeholder_text_single||this.options.placeholder_text||AbstractChosen.default_single_text,this.results_none_found=this.form_field.getAttribute("data-no_results_text")||this.options.no_results_text||AbstractChosen.default_no_result_text},AbstractChosen.prototype.mouse_enter=function(){return this.mouse_on_container=!0},AbstractChosen.prototype.mouse_leave=function(){return this.mouse_on_container=!1},AbstractChosen.prototype.input_focus=function(){var a=this;if(this.is_multiple){if(!this.active_field)return setTimeout(function(){return a.container_mousedown()},50)}else if(!this.active_field)return this.activate_field()},AbstractChosen.prototype.input_blur=function(){var a=this;return this.mouse_on_container?void 0:(this.active_field=!1,setTimeout(function(){return a.blur_test()},100))},AbstractChosen.prototype.results_option_build=function(a){var b,c,d,e,f;for(b="",f=this.results_data,d=0,e=f.length;e>d;d++)c=f[d],b+=c.group?this.result_add_group(c):this.result_add_option(c),(null!=a?a.first:void 0)&&(c.selected&&this.is_multiple?this.choice_build(c):c.selected&&!this.is_multiple&&this.single_set_selected_text(c.text));return b},AbstractChosen.prototype.result_add_option=function(a){var b,c;return a.search_match?this.include_option_in_results(a)?(b=[],a.disabled||a.selected&&this.is_multiple||b.push("active-result"),!a.disabled||a.selected&&this.is_multiple||b.push("disabled-result"),a.selected&&b.push("result-selected"),null!=a.group_array_index&&b.push("group-option"),""!==a.classes&&b.push(a.classes),c=""!==a.style.cssText?' style="'+a.style+'"':"",'<li class="'+b.join(" ")+'"'+c+' data-option-array-index="'+a.array_index+'">'+a.search_text+"</li>"):"":""},AbstractChosen.prototype.result_add_group=function(a){return a.search_match||a.group_match?a.active_options>0?'<li class="group-result">'+a.search_text+"</li>":"":""},AbstractChosen.prototype.results_update_field=function(){return this.set_default_text(),this.is_multiple||this.results_reset_cleanup(),this.result_clear_highlight(),this.result_single_selected=null,this.results_build(),this.results_showing?this.winnow_results():void 0},AbstractChosen.prototype.results_toggle=function(){return this.results_showing?this.results_hide():this.results_show()},AbstractChosen.prototype.results_search=function(){return this.results_showing?this.winnow_results():this.results_show()},AbstractChosen.prototype.winnow_results=function(){var a,b,c,d,e,f,g,h,i,j,k,l,m;for(this.no_results_clear(),e=0,g=this.get_search_text(),a=g.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),d=this.search_contains?"":"^",c=new RegExp(d+a,"i"),j=new RegExp(a,"i"),m=this.results_data,k=0,l=m.length;l>k;k++)b=m[k],b.search_match=!1,f=null,this.include_option_in_results(b)&&(b.group&&(b.group_match=!1,b.active_options=0),null!=b.group_array_index&&this.results_data[b.group_array_index]&&(f=this.results_data[b.group_array_index],0===f.active_options&&f.search_match&&(e+=1),f.active_options+=1),(!b.group||this.group_search)&&(b.search_text=b.group?b.label:b.html,b.search_match=this.search_string_match(b.search_text,c),b.search_match&&!b.group&&(e+=1),b.search_match?(g.length&&(h=b.search_text.search(j),i=b.search_text.substr(0,h+g.length)+"</em>"+b.search_text.substr(h+g.length),b.search_text=i.substr(0,h)+"<em>"+i.substr(h)),null!=f&&(f.group_match=!0)):null!=b.group_array_index&&this.results_data[b.group_array_index].search_match&&(b.search_match=!0)));return this.result_clear_highlight(),1>e&&g.length?(this.update_results_content(""),this.no_results(g)):(this.update_results_content(this.results_option_build()),this.winnow_results_set_highlight())},AbstractChosen.prototype.search_string_match=function(a,b){var c,d,e,f;if(b.test(a))return!0;if(this.enable_split_word_search&&(a.indexOf(" ")>=0||0===a.indexOf("["))&&(d=a.replace(/\[|\]/g,"").split(" "),d.length))for(e=0,f=d.length;f>e;e++)if(c=d[e],b.test(c))return!0},AbstractChosen.prototype.choices_count=function(){var a,b,c,d;if(null!=this.selected_option_count)return this.selected_option_count;for(this.selected_option_count=0,d=this.form_field.options,b=0,c=d.length;c>b;b++)a=d[b],a.selected&&(this.selected_option_count+=1);return this.selected_option_count},AbstractChosen.prototype.choices_click=function(a){return a.preventDefault(),this.results_showing||this.is_disabled?void 0:this.results_show()},AbstractChosen.prototype.keyup_checker=function(a){var b,c;switch(b=null!=(c=a.which)?c:a.keyCode,this.search_field_scale(),b){case 8:if(this.is_multiple&&this.backstroke_length<1&&this.choices_count()>0)return this.keydown_backstroke();if(!this.pending_backstroke)return this.result_clear_highlight(),this.results_search();break;case 13:if(a.preventDefault(),this.results_showing)return this.result_select(a);break;case 27:return this.results_showing&&this.results_hide(),!0;case 9:case 38:case 40:case 16:case 91:case 17:break;default:return this.results_search()}},AbstractChosen.prototype.container_width=function(){return null!=this.options.width?this.options.width:""+this.form_field.offsetWidth+"px"},AbstractChosen.prototype.include_option_in_results=function(a){return this.is_multiple&&!this.display_selected_options&&a.selected?!1:!this.display_disabled_options&&a.disabled?!1:a.empty?!1:!0},AbstractChosen.browser_is_supported=function(){return"Microsoft Internet Explorer"===window.navigator.appName?document.documentMode>=8:/iP(od|hone)/i.test(window.navigator.userAgent)?!1:/Android/i.test(window.navigator.userAgent)&&/Mobile/i.test(window.navigator.userAgent)?!1:!0},AbstractChosen.default_multiple_text="Select Some Options",AbstractChosen.default_single_text="Select an Option",AbstractChosen.default_no_result_text="No results match",AbstractChosen}(),a=jQuery,a.fn.extend({chosen:function(b){return AbstractChosen.browser_is_supported()?this.each(function(){var c,d;c=a(this),d=c.data("chosen"),"destroy"===b&&d?d.destroy():d||c.data("chosen",new Chosen(this,b))}):this}}),Chosen=function(c){function Chosen(){return b=Chosen.__super__.constructor.apply(this,arguments)}return d(Chosen,c),Chosen.prototype.setup=function(){return this.form_field_jq=a(this.form_field),this.current_selectedIndex=this.form_field.selectedIndex,this.is_rtl=this.form_field_jq.hasClass("chosen-rtl")},Chosen.prototype.set_up_html=function(){var b,c;return b=["chosen-container"],b.push("chosen-container-"+(this.is_multiple?"multi":"single")),this.inherit_select_classes&&this.form_field.className&&b.push(this.form_field.className),this.is_rtl&&b.push("chosen-rtl"),c={"class":b.join(" "),style:"width: "+this.container_width()+";",title:this.form_field.title},this.form_field.id.length&&(c.id=this.form_field.id.replace(/[^\w]/g,"_")+"_chosen"),this.container=a("<div />",c),this.is_multiple?this.container.html('<ul class="chosen-choices"><li class="search-field"><input type="text" value="'+this.default_text+'" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chosen-drop"><ul class="chosen-results"></ul></div>'):this.container.html('<a class="chosen-single chosen-default" tabindex="-1"><span>'+this.default_text+'</span><div><b></b></div></a><div class="chosen-drop"><div class="chosen-search"><input type="text" autocomplete="off" /></div><ul class="chosen-results"></ul></div>'),this.form_field_jq.hide().after(this.container),this.dropdown=this.container.find("div.chosen-drop").first(),this.search_field=this.container.find("input").first(),this.search_results=this.container.find("ul.chosen-results").first(),this.search_field_scale(),this.search_no_results=this.container.find("li.no-results").first(),this.is_multiple?(this.search_choices=this.container.find("ul.chosen-choices").first(),this.search_container=this.container.find("li.search-field").first()):(this.search_container=this.container.find("div.chosen-search").first(),this.selected_item=this.container.find(".chosen-single").first()),this.results_build(),this.set_tab_index(),this.set_label_behavior(),this.form_field_jq.trigger("chosen:ready",{chosen:this})},Chosen.prototype.register_observers=function(){var a=this;return this.container.bind("mousedown.chosen",function(b){a.container_mousedown(b)}),this.container.bind("mouseup.chosen",function(b){a.container_mouseup(b)}),this.container.bind("mouseenter.chosen",function(b){a.mouse_enter(b)}),this.container.bind("mouseleave.chosen",function(b){a.mouse_leave(b)}),this.search_results.bind("mouseup.chosen",function(b){a.search_results_mouseup(b)}),this.search_results.bind("mouseover.chosen",function(b){a.search_results_mouseover(b)}),this.search_results.bind("mouseout.chosen",function(b){a.search_results_mouseout(b)}),this.search_results.bind("mousewheel.chosen DOMMouseScroll.chosen",function(b){a.search_results_mousewheel(b)}),this.form_field_jq.bind("chosen:updated.chosen",function(b){a.results_update_field(b)}),this.form_field_jq.bind("chosen:activate.chosen",function(b){a.activate_field(b)}),this.form_field_jq.bind("chosen:open.chosen",function(b){a.container_mousedown(b)}),this.search_field.bind("blur.chosen",function(b){a.input_blur(b)}),this.search_field.bind("keyup.chosen",function(b){a.keyup_checker(b)}),this.search_field.bind("keydown.chosen",function(b){a.keydown_checker(b)}),this.search_field.bind("focus.chosen",function(b){a.input_focus(b)}),this.is_multiple?this.search_choices.bind("click.chosen",function(b){a.choices_click(b)}):this.container.bind("click.chosen",function(a){a.preventDefault()})},Chosen.prototype.destroy=function(){return a(document).unbind("click.chosen",this.click_test_action),this.search_field[0].tabIndex&&(this.form_field_jq[0].tabIndex=this.search_field[0].tabIndex),this.container.remove(),this.form_field_jq.removeData("chosen"),this.form_field_jq.show()},Chosen.prototype.search_field_disabled=function(){return this.is_disabled=this.form_field_jq[0].disabled,this.is_disabled?(this.container.addClass("chosen-disabled"),this.search_field[0].disabled=!0,this.is_multiple||this.selected_item.unbind("focus.chosen",this.activate_action),this.close_field()):(this.container.removeClass("chosen-disabled"),this.search_field[0].disabled=!1,this.is_multiple?void 0:this.selected_item.bind("focus.chosen",this.activate_action))},Chosen.prototype.container_mousedown=function(b){return this.is_disabled||(b&&"mousedown"===b.type&&!this.results_showing&&b.preventDefault(),null!=b&&a(b.target).hasClass("search-choice-close"))?void 0:(this.active_field?this.is_multiple||!b||a(b.target)[0]!==this.selected_item[0]&&!a(b.target).parents("a.chosen-single").length||(b.preventDefault(),this.results_toggle()):(this.is_multiple&&this.search_field.val(""),a(document).bind("click.chosen",this.click_test_action),this.results_show()),this.activate_field())},Chosen.prototype.container_mouseup=function(a){return"ABBR"!==a.target.nodeName||this.is_disabled?void 0:this.results_reset(a)},Chosen.prototype.search_results_mousewheel=function(a){var b,c,d;return b=-(null!=(c=a.originalEvent)?c.wheelDelta:void 0)||(null!=(d=a.originialEvent)?d.detail:void 0),null!=b?(a.preventDefault(),"DOMMouseScroll"===a.type&&(b=40*b),this.search_results.scrollTop(b+this.search_results.scrollTop())):void 0},Chosen.prototype.blur_test=function(){return!this.active_field&&this.container.hasClass("chosen-container-active")?this.close_field():void 0},Chosen.prototype.close_field=function(){return a(document).unbind("click.chosen",this.click_test_action),this.active_field=!1,this.results_hide(),this.container.removeClass("chosen-container-active"),this.clear_backstroke(),this.show_search_field_default(),this.search_field_scale()},Chosen.prototype.activate_field=function(){return this.container.addClass("chosen-container-active"),this.active_field=!0,this.search_field.val(this.search_field.val()),this.search_field.focus()},Chosen.prototype.test_active_click=function(b){return this.container.is(a(b.target).closest(".chosen-container"))?this.active_field=!0:this.close_field()},Chosen.prototype.results_build=function(){return this.parsing=!0,this.selected_option_count=null,this.results_data=SelectParser.select_to_array(this.form_field),this.is_multiple?this.search_choices.find("li.search-choice").remove():this.is_multiple||(this.single_set_selected_text(),this.disable_search||this.form_field.options.length<=this.disable_search_threshold?(this.search_field[0].readOnly=!0,this.container.addClass("chosen-container-single-nosearch")):(this.search_field[0].readOnly=!1,this.container.removeClass("chosen-container-single-nosearch"))),this.update_results_content(this.results_option_build({first:!0})),this.search_field_disabled(),this.show_search_field_default(),this.search_field_scale(),this.parsing=!1},Chosen.prototype.result_do_highlight=function(a){var b,c,d,e,f;if(a.length){if(this.result_clear_highlight(),this.result_highlight=a,this.result_highlight.addClass("highlighted"),d=parseInt(this.search_results.css("maxHeight"),10),f=this.search_results.scrollTop(),e=d+f,c=this.result_highlight.position().top+this.search_results.scrollTop(),b=c+this.result_highlight.outerHeight(),b>=e)return this.search_results.scrollTop(b-d>0?b-d:0);if(f>c)return this.search_results.scrollTop(c)}},Chosen.prototype.result_clear_highlight=function(){return this.result_highlight&&this.result_highlight.removeClass("highlighted"),this.result_highlight=null},Chosen.prototype.results_show=function(){return this.is_multiple&&this.max_selected_options<=this.choices_count()?(this.form_field_jq.trigger("chosen:maxselected",{chosen:this}),!1):(this.container.addClass("chosen-with-drop"),this.form_field_jq.trigger("chosen:showing_dropdown",{chosen:this}),this.results_showing=!0,this.search_field.focus(),this.search_field.val(this.search_field.val()),this.winnow_results())},Chosen.prototype.update_results_content=function(a){return this.search_results.html(a)},Chosen.prototype.results_hide=function(){return this.results_showing&&(this.result_clear_highlight(),this.container.removeClass("chosen-with-drop"),this.form_field_jq.trigger("chosen:hiding_dropdown",{chosen:this})),this.results_showing=!1},Chosen.prototype.set_tab_index=function(){var a;return this.form_field.tabIndex?(a=this.form_field.tabIndex,this.form_field.tabIndex=-1,this.search_field[0].tabIndex=a):void 0},Chosen.prototype.set_label_behavior=function(){var b=this;return this.form_field_label=this.form_field_jq.parents("label"),!this.form_field_label.length&&this.form_field.id.length&&(this.form_field_label=a("label[for='"+this.form_field.id+"']")),this.form_field_label.length>0?this.form_field_label.bind("click.chosen",function(a){return b.is_multiple?b.container_mousedown(a):b.activate_field()}):void 0},Chosen.prototype.show_search_field_default=function(){return this.is_multiple&&this.choices_count()<1&&!this.active_field?(this.search_field.val(this.default_text),this.search_field.addClass("default")):(this.search_field.val(""),this.search_field.removeClass("default"))},Chosen.prototype.search_results_mouseup=function(b){var c;return c=a(b.target).hasClass("active-result")?a(b.target):a(b.target).parents(".active-result").first(),c.length?(this.result_highlight=c,this.result_select(b),this.search_field.focus()):void 0},Chosen.prototype.search_results_mouseover=function(b){var c;return c=a(b.target).hasClass("active-result")?a(b.target):a(b.target).parents(".active-result").first(),c?this.result_do_highlight(c):void 0},Chosen.prototype.search_results_mouseout=function(b){return a(b.target).hasClass("active-result")?this.result_clear_highlight():void 0},Chosen.prototype.choice_build=function(b){var c,d,e=this;return c=a("<li />",{"class":"search-choice"}).html("<span>"+b.html+"</span>"),b.disabled?c.addClass("search-choice-disabled"):(d=a("<a />",{"class":"search-choice-close","data-option-array-index":b.array_index}),d.bind("click.chosen",function(a){return e.choice_destroy_link_click(a)}),c.append(d)),this.search_container.before(c)},Chosen.prototype.choice_destroy_link_click=function(b){return b.preventDefault(),b.stopPropagation(),this.is_disabled?void 0:this.choice_destroy(a(b.target))},Chosen.prototype.choice_destroy=function(a){return this.result_deselect(a[0].getAttribute("data-option-array-index"))?(this.show_search_field_default(),this.is_multiple&&this.choices_count()>0&&this.search_field.val().length<1&&this.results_hide(),a.parents("li").first().remove(),this.search_field_scale()):void 0},Chosen.prototype.results_reset=function(){return this.form_field.options[0].selected=!0,this.selected_option_count=null,this.single_set_selected_text(),this.show_search_field_default(),this.results_reset_cleanup(),this.form_field_jq.trigger("change"),this.active_field?this.results_hide():void 0},Chosen.prototype.results_reset_cleanup=function(){return this.current_selectedIndex=this.form_field.selectedIndex,this.selected_item.find("abbr").remove()},Chosen.prototype.result_select=function(a){var b,c,d;return this.result_highlight?(b=this.result_highlight,this.result_clear_highlight(),this.is_multiple&&this.max_selected_options<=this.choices_count()?(this.form_field_jq.trigger("chosen:maxselected",{chosen:this}),!1):(this.is_multiple?b.removeClass("active-result"):(this.result_single_selected&&(this.result_single_selected.removeClass("result-selected"),d=this.result_single_selected[0].getAttribute("data-option-array-index"),this.results_data[d].selected=!1),this.result_single_selected=b),b.addClass("result-selected"),c=this.results_data[b[0].getAttribute("data-option-array-index")],c.selected=!0,this.form_field.options[c.options_index].selected=!0,this.selected_option_count=null,this.is_multiple?this.choice_build(c):this.single_set_selected_text(c.text),(a.metaKey||a.ctrlKey)&&this.is_multiple||this.results_hide(),this.search_field.val(""),(this.is_multiple||this.form_field.selectedIndex!==this.current_selectedIndex)&&this.form_field_jq.trigger("change",{selected:this.form_field.options[c.options_index].value}),this.current_selectedIndex=this.form_field.selectedIndex,this.search_field_scale())):void 0},Chosen.prototype.single_set_selected_text=function(a){return null==a&&(a=this.default_text),a===this.default_text?this.selected_item.addClass("chosen-default"):(this.single_deselect_control_build(),this.selected_item.removeClass("chosen-default")),this.selected_item.find("span").text(a)},Chosen.prototype.result_deselect=function(a){var b;return b=this.results_data[a],this.form_field.options[b.options_index].disabled?!1:(b.selected=!1,this.form_field.options[b.options_index].selected=!1,this.selected_option_count=null,this.result_clear_highlight(),this.results_showing&&this.winnow_results(),this.form_field_jq.trigger("change",{deselected:this.form_field.options[b.options_index].value}),this.search_field_scale(),!0)},Chosen.prototype.single_deselect_control_build=function(){return this.allow_single_deselect?(this.selected_item.find("abbr").length||this.selected_item.find("span").first().after('<abbr class="search-choice-close"></abbr>'),this.selected_item.addClass("chosen-single-with-deselect")):void 0},Chosen.prototype.get_search_text=function(){return this.search_field.val()===this.default_text?"":a("<div/>").text(a.trim(this.search_field.val())).html()},Chosen.prototype.winnow_results_set_highlight=function(){var a,b;return b=this.is_multiple?[]:this.search_results.find(".result-selected.active-result"),a=b.length?b.first():this.search_results.find(".active-result").first(),null!=a?this.result_do_highlight(a):void 0},Chosen.prototype.no_results=function(b){var c;return c=a('<li class="no-results">'+this.results_none_found+' "<span></span>"</li>'),c.find("span").first().html(b),this.search_results.append(c)},Chosen.prototype.no_results_clear=function(){return this.search_results.find(".no-results").remove()},Chosen.prototype.keydown_arrow=function(){var a;return this.results_showing&&this.result_highlight?(a=this.result_highlight.nextAll("li.active-result").first())?this.result_do_highlight(a):void 0:this.results_show()},Chosen.prototype.keyup_arrow=function(){var a;return this.results_showing||this.is_multiple?this.result_highlight?(a=this.result_highlight.prevAll("li.active-result"),a.length?this.result_do_highlight(a.first()):(this.choices_count()>0&&this.results_hide(),this.result_clear_highlight())):void 0:this.results_show()},Chosen.prototype.keydown_backstroke=function(){var a;return this.pending_backstroke?(this.choice_destroy(this.pending_backstroke.find("a").first()),this.clear_backstroke()):(a=this.search_container.siblings("li.search-choice").last(),a.length&&!a.hasClass("search-choice-disabled")?(this.pending_backstroke=a,this.single_backstroke_delete?this.keydown_backstroke():this.pending_backstroke.addClass("search-choice-focus")):void 0)},Chosen.prototype.clear_backstroke=function(){return this.pending_backstroke&&this.pending_backstroke.removeClass("search-choice-focus"),this.pending_backstroke=null},Chosen.prototype.keydown_checker=function(a){var b,c;switch(b=null!=(c=a.which)?c:a.keyCode,this.search_field_scale(),8!==b&&this.pending_backstroke&&this.clear_backstroke(),b){case 8:this.backstroke_length=this.search_field.val().length;break;case 9:this.results_showing&&!this.is_multiple&&this.result_select(a),this.mouse_on_container=!1;break;case 13:a.preventDefault();break;case 38:a.preventDefault(),this.keyup_arrow();break;case 40:a.preventDefault(),this.keydown_arrow()}},Chosen.prototype.search_field_scale=function(){var b,c,d,e,f,g,h,i,j;if(this.is_multiple){for(d=0,h=0,f="position:absolute; left: -1000px; top: -1000px; display:none;",g=["font-size","font-style","font-weight","font-family","line-height","text-transform","letter-spacing"],i=0,j=g.length;j>i;i++)e=g[i],f+=e+":"+this.search_field.css(e)+";";return b=a("<div />",{style:f}),b.text(this.search_field.val()),a("body").append(b),h=b.width()+25,b.remove(),c=this.container.outerWidth(),h>c-10&&(h=c-10),this.search_field.css({width:h+"px"})}},Chosen}(AbstractChosen)}.call(this);;
/*!
 * typeahead.js 0.9.3
 * https://github.com/twitter/typeahead
 * Copyright 2013 Twitter, Inc. and other contributors; Licensed MIT
 */

!function(a){var b="0.9.3",c={isMsie:function(){var a=/(msie) ([\w.]+)/i.exec(navigator.userAgent);return a?parseInt(a[2],10):!1},isBlankString:function(a){return!a||/^\s*$/.test(a)},escapeRegExChars:function(a){return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")},isString:function(a){return"string"==typeof a},isNumber:function(a){return"number"==typeof a},isArray:a.isArray,isFunction:a.isFunction,isObject:a.isPlainObject,isUndefined:function(a){return"undefined"==typeof a},bind:a.proxy,bindAll:function(b){var c;for(var d in b)a.isFunction(c=b[d])&&(b[d]=a.proxy(c,b))},indexOf:function(a,b){for(var c=0;c<a.length;c++)if(a[c]===b)return c;return-1},each:a.each,map:a.map,filter:a.grep,every:function(b,c){var d=!0;return b?(a.each(b,function(a,e){return(d=c.call(null,e,a,b))?void 0:!1}),!!d):d},some:function(b,c){var d=!1;return b?(a.each(b,function(a,e){return(d=c.call(null,e,a,b))?!1:void 0}),!!d):d},mixin:a.extend,getUniqueId:function(){var a=0;return function(){return a++}}(),defer:function(a){setTimeout(a,0)},debounce:function(a,b,c){var d,e;return function(){var f,g,h=this,i=arguments;return f=function(){d=null,c||(e=a.apply(h,i))},g=c&&!d,clearTimeout(d),d=setTimeout(f,b),g&&(e=a.apply(h,i)),e}},throttle:function(a,b){var c,d,e,f,g,h;return g=0,h=function(){g=new Date,e=null,f=a.apply(c,d)},function(){var i=new Date,j=b-(i-g);return c=this,d=arguments,0>=j?(clearTimeout(e),e=null,g=i,f=a.apply(c,d)):e||(e=setTimeout(h,j)),f}},tokenizeQuery:function(b){return a.trim(b).toLowerCase().split(/[\s]+/)},tokenizeText:function(b){return a.trim(b).toLowerCase().split(/[\s\-_]+/)},getProtocol:function(){return location.protocol},noop:function(){}},d=function(){var a=/\s+/;return{on:function(b,c){var d;if(!c)return this;for(this._callbacks=this._callbacks||{},b=b.split(a);d=b.shift();)this._callbacks[d]=this._callbacks[d]||[],this._callbacks[d].push(c);return this},trigger:function(b,c){var d,e;if(!this._callbacks)return this;for(b=b.split(a);d=b.shift();)if(e=this._callbacks[d])for(var f=0;f<e.length;f+=1)e[f].call(this,{type:d,data:c});return this}}}(),e=function(){function b(b){b&&b.el||a.error("EventBus initialized without el"),this.$el=a(b.el)}var d="typeahead:";return c.mixin(b.prototype,{trigger:function(a){var b=[].slice.call(arguments,1);this.$el.trigger(d+a,b)}}),b}(),f=function(){function a(a){this.prefix=["__",a,"__"].join(""),this.ttlKey="__ttl__",this.keyMatcher=new RegExp("^"+this.prefix)}function b(){return(new Date).getTime()}function d(a){return JSON.stringify(c.isUndefined(a)?null:a)}function e(a){return JSON.parse(a)}var f,g;try{f=window.localStorage,f.setItem("~~~","!"),f.removeItem("~~~")}catch(h){f=null}return g=f&&window.JSON?{_prefix:function(a){return this.prefix+a},_ttlKey:function(a){return this._prefix(a)+this.ttlKey},get:function(a){return this.isExpired(a)&&this.remove(a),e(f.getItem(this._prefix(a)))},set:function(a,e,g){return c.isNumber(g)?f.setItem(this._ttlKey(a),d(b()+g)):f.removeItem(this._ttlKey(a)),f.setItem(this._prefix(a),d(e))},remove:function(a){return f.removeItem(this._ttlKey(a)),f.removeItem(this._prefix(a)),this},clear:function(){var a,b,c=[],d=f.length;for(a=0;d>a;a++)(b=f.key(a)).match(this.keyMatcher)&&c.push(b.replace(this.keyMatcher,""));for(a=c.length;a--;)this.remove(c[a]);return this},isExpired:function(a){var d=e(f.getItem(this._ttlKey(a)));return c.isNumber(d)&&b()>d?!0:!1}}:{get:c.noop,set:c.noop,remove:c.noop,clear:c.noop,isExpired:c.noop},c.mixin(a.prototype,g),a}(),g=function(){function a(a){c.bindAll(this),a=a||{},this.sizeLimit=a.sizeLimit||10,this.cache={},this.cachedKeysByAge=[]}return c.mixin(a.prototype,{get:function(a){return this.cache[a]},set:function(a,b){var c;this.cachedKeysByAge.length===this.sizeLimit&&(c=this.cachedKeysByAge.shift(),delete this.cache[c]),this.cache[a]=b,this.cachedKeysByAge.push(a)}}),a}(),h=function(){function b(a){c.bindAll(this),a=c.isString(a)?{url:a}:a,i=i||new g,h=c.isNumber(a.maxParallelRequests)?a.maxParallelRequests:h||6,this.url=a.url,this.wildcard=a.wildcard||"%QUERY",this.filter=a.filter,this.replace=a.replace,this.ajaxSettings={type:"get",cache:a.cache,timeout:a.timeout,dataType:a.dataType||"json",beforeSend:a.beforeSend},this._get=(/^throttle$/i.test(a.rateLimitFn)?c.throttle:c.debounce)(this._get,a.rateLimitWait||300)}function d(){j++}function e(){j--}function f(){return h>j}var h,i,j=0,k={};return c.mixin(b.prototype,{_get:function(a,b){function c(c){var e=d.filter?d.filter(c):c;b&&b(e),i.set(a,c)}var d=this;f()?this._sendRequest(a).done(c):this.onDeckRequestArgs=[].slice.call(arguments,0)},_sendRequest:function(b){function c(){e(),k[b]=null,f.onDeckRequestArgs&&(f._get.apply(f,f.onDeckRequestArgs),f.onDeckRequestArgs=null)}var f=this,g=k[b];return g||(d(),g=k[b]=a.ajax(b,this.ajaxSettings).always(c)),g},get:function(a,b){var d,e,f=this,g=encodeURIComponent(a||"");return b=b||c.noop,d=this.replace?this.replace(this.url,g):this.url.replace(this.wildcard,g),(e=i.get(d))?c.defer(function(){b(f.filter?f.filter(e):e)}):this._get(d,b),!!e}}),b}(),i=function(){function d(b){c.bindAll(this),c.isString(b.template)&&!b.engine&&a.error("no template engine specified"),b.local||b.prefetch||b.remote||a.error("one of local, prefetch, or remote is required"),this.name=b.name||c.getUniqueId(),this.limit=b.limit||5,this.minLength=b.minLength||1,this.header=b.header,this.footer=b.footer,this.valueKey=b.valueKey||"value",this.template=e(b.template,b.engine,this.valueKey),this.local=b.local,this.prefetch=b.prefetch,this.remote=b.remote,this.itemHash={},this.adjacencyList={},this.storage=b.name?new f(b.name):null}function e(a,b,d){var e,f;return c.isFunction(a)?e=a:c.isString(a)?(f=b.compile(a),e=c.bind(f.render,f)):e=function(a){return"<p>"+a[d]+"</p>"},e}var g={thumbprint:"thumbprint",protocol:"protocol",itemHash:"itemHash",adjacencyList:"adjacencyList"};return c.mixin(d.prototype,{_processLocalData:function(a){this._mergeProcessedData(this._processData(a))},_loadPrefetchData:function(d){function e(a){var b=d.filter?d.filter(a):a,e=m._processData(b),f=e.itemHash,h=e.adjacencyList;m.storage&&(m.storage.set(g.itemHash,f,d.ttl),m.storage.set(g.adjacencyList,h,d.ttl),m.storage.set(g.thumbprint,n,d.ttl),m.storage.set(g.protocol,c.getProtocol(),d.ttl)),m._mergeProcessedData(e)}var f,h,i,j,k,l,m=this,n=b+(d.thumbprint||"");return this.storage&&(f=this.storage.get(g.thumbprint),h=this.storage.get(g.protocol),i=this.storage.get(g.itemHash),j=this.storage.get(g.adjacencyList)),k=f!==n||h!==c.getProtocol(),d=c.isString(d)?{url:d}:d,d.ttl=c.isNumber(d.ttl)?d.ttl:864e5,i&&j&&!k?(this._mergeProcessedData({itemHash:i,adjacencyList:j}),l=a.Deferred().resolve()):l=a.getJSON(d.url).done(e),l},_transformDatum:function(a){var b=c.isString(a)?a:a[this.valueKey],d=a.tokens||c.tokenizeText(b),e={value:b,tokens:d};return c.isString(a)?(e.datum={},e.datum[this.valueKey]=a):e.datum=a,e.tokens=c.filter(e.tokens,function(a){return!c.isBlankString(a)}),e.tokens=c.map(e.tokens,function(a){return a.toLowerCase()}),e},_processData:function(a){var b=this,d={},e={};return c.each(a,function(a,f){var g=b._transformDatum(f),h=c.getUniqueId(g.value);d[h]=g,c.each(g.tokens,function(a,b){var d=b.charAt(0),f=e[d]||(e[d]=[h]);!~c.indexOf(f,h)&&f.push(h)})}),{itemHash:d,adjacencyList:e}},_mergeProcessedData:function(a){var b=this;c.mixin(this.itemHash,a.itemHash),c.each(a.adjacencyList,function(a,c){var d=b.adjacencyList[a];b.adjacencyList[a]=d?d.concat(c):c})},_getLocalSuggestions:function(a){var b,d=this,e=[],f=[],g=[];return c.each(a,function(a,b){var d=b.charAt(0);!~c.indexOf(e,d)&&e.push(d)}),c.each(e,function(a,c){var e=d.adjacencyList[c];return e?(f.push(e),(!b||e.length<b.length)&&(b=e),void 0):!1}),f.length<e.length?[]:(c.each(b,function(b,e){var h,i,j=d.itemHash[e];h=c.every(f,function(a){return~c.indexOf(a,e)}),i=h&&c.every(a,function(a){return c.some(j.tokens,function(b){return 0===b.indexOf(a)})}),i&&g.push(j)}),g)},initialize:function(){var b;return this.local&&this._processLocalData(this.local),this.transport=this.remote?new h(this.remote):null,b=this.prefetch?this._loadPrefetchData(this.prefetch):a.Deferred().resolve(),this.local=this.prefetch=this.remote=null,this.initialize=function(){return b},b},getSuggestions:function(a,b){function d(a){f=f.slice(0),c.each(a,function(a,b){var d,e=g._transformDatum(b);return d=c.some(f,function(a){return e.value===a.value}),!d&&f.push(e),f.length<g.limit}),b&&b(f)}var e,f,g=this,h=!1;a.length<this.minLength||(e=c.tokenizeQuery(a),f=this._getLocalSuggestions(e).slice(0,this.limit),f.length<this.limit&&this.transport&&(h=this.transport.get(a,d)),!h&&b&&b(f))}}),d}(),j=function(){function b(b){var d=this;c.bindAll(this),this.specialKeyCodeMap={9:"tab",27:"esc",37:"left",39:"right",13:"enter",38:"up",40:"down"},this.$hint=a(b.hint),this.$input=a(b.input).on("blur.tt",this._handleBlur).on("focus.tt",this._handleFocus).on("keydown.tt",this._handleSpecialKeyEvent),c.isMsie()?this.$input.on("keydown.tt keypress.tt cut.tt paste.tt",function(a){d.specialKeyCodeMap[a.which||a.keyCode]||c.defer(d._compareQueryToInputValue)}):this.$input.on("input.tt",this._compareQueryToInputValue),this.query=this.$input.val(),this.$overflowHelper=e(this.$input)}function e(b){return a("<span></span>").css({position:"absolute",left:"-9999px",visibility:"hidden",whiteSpace:"nowrap",fontFamily:b.css("font-family"),fontSize:b.css("font-size"),fontStyle:b.css("font-style"),fontVariant:b.css("font-variant"),fontWeight:b.css("font-weight"),wordSpacing:b.css("word-spacing"),letterSpacing:b.css("letter-spacing"),textIndent:b.css("text-indent"),textRendering:b.css("text-rendering"),textTransform:b.css("text-transform")}).insertAfter(b)}function f(a,b){return a=(a||"").replace(/^\s*/g,"").replace(/\s{2,}/g," "),b=(b||"").replace(/^\s*/g,"").replace(/\s{2,}/g," "),a===b}return c.mixin(b.prototype,d,{_handleFocus:function(){this.trigger("focused")},_handleBlur:function(){this.trigger("blured")},_handleSpecialKeyEvent:function(a){var b=this.specialKeyCodeMap[a.which||a.keyCode];b&&this.trigger(b+"Keyed",a)},_compareQueryToInputValue:function(){var a=this.getInputValue(),b=f(this.query,a),c=b?this.query.length!==a.length:!1;c?this.trigger("whitespaceChanged",{value:this.query}):b||this.trigger("queryChanged",{value:this.query=a})},destroy:function(){this.$hint.off(".tt"),this.$input.off(".tt"),this.$hint=this.$input=this.$overflowHelper=null},focus:function(){this.$input.focus()},blur:function(){this.$input.blur()},getQuery:function(){return this.query},setQuery:function(a){this.query=a},getInputValue:function(){return this.$input.val()},setInputValue:function(a,b){this.$input.val(a),!b&&this._compareQueryToInputValue()},getHintValue:function(){return this.$hint.val()},setHintValue:function(a){this.$hint.val(a)},getLanguageDirection:function(){return(this.$input.css("direction")||"ltr").toLowerCase()},isOverflow:function(){return this.$overflowHelper.text(this.getInputValue()),this.$overflowHelper.width()>this.$input.width()},isCursorAtEnd:function(){var a,b=this.$input.val().length,d=this.$input[0].selectionStart;return c.isNumber(d)?d===b:document.selection?(a=document.selection.createRange(),a.moveStart("character",-b),b===a.text.length):!0}}),b}(),k=function(){function b(b){c.bindAll(this),this.isOpen=!1,this.isEmpty=!0,this.isMouseOverDropdown=!1,this.$menu=a(b.menu).on("mouseenter.tt",this._handleMouseenter).on("mouseleave.tt",this._handleMouseleave).on("click.tt",".tt-suggestion",this._handleSelection).on("mouseover.tt",".tt-suggestion",this._handleMouseover)}function e(a){return a.data("suggestion")}var f={suggestionsList:'<span class="tt-suggestions"></span>'},g={suggestionsList:{display:"block"},suggestion:{whiteSpace:"nowrap",cursor:"pointer"},suggestionChild:{whiteSpace:"normal"}};return c.mixin(b.prototype,d,{_handleMouseenter:function(){this.isMouseOverDropdown=!0},_handleMouseleave:function(){this.isMouseOverDropdown=!1},_handleMouseover:function(b){var c=a(b.currentTarget);this._getSuggestions().removeClass("tt-is-under-cursor"),c.addClass("tt-is-under-cursor")},_handleSelection:function(b){var c=a(b.currentTarget);this.trigger("suggestionSelected",e(c))},_show:function(){this.$menu.css("display","block")},_hide:function(){this.$menu.hide()},_moveCursor:function(a){var b,c,d,f;if(this.isVisible()){if(b=this._getSuggestions(),c=b.filter(".tt-is-under-cursor"),c.removeClass("tt-is-under-cursor"),d=b.index(c)+a,d=(d+1)%(b.length+1)-1,-1===d)return this.trigger("cursorRemoved"),void 0;-1>d&&(d=b.length-1),f=b.eq(d).addClass("tt-is-under-cursor"),this._ensureVisibility(f),this.trigger("cursorMoved",e(f))}},_getSuggestions:function(){return this.$menu.find(".tt-suggestions > .tt-suggestion")},_ensureVisibility:function(a){var b=this.$menu.height()+parseInt(this.$menu.css("paddingTop"),10)+parseInt(this.$menu.css("paddingBottom"),10),c=this.$menu.scrollTop(),d=a.position().top,e=d+a.outerHeight(!0);0>d?this.$menu.scrollTop(c+d):e>b&&this.$menu.scrollTop(c+(e-b))},destroy:function(){this.$menu.off(".tt"),this.$menu=null},isVisible:function(){return this.isOpen&&!this.isEmpty},closeUnlessMouseIsOverDropdown:function(){this.isMouseOverDropdown||this.close()},close:function(){this.isOpen&&(this.isOpen=!1,this.isMouseOverDropdown=!1,this._hide(),this.$menu.find(".tt-suggestions > .tt-suggestion").removeClass("tt-is-under-cursor"),this.trigger("closed"))},open:function(){this.isOpen||(this.isOpen=!0,!this.isEmpty&&this._show(),this.trigger("opened"))},setLanguageDirection:function(a){var b={left:"0",right:"auto"},c={left:"auto",right:" 0"};"ltr"===a?this.$menu.css(b):this.$menu.css(c)},moveCursorUp:function(){this._moveCursor(-1)},moveCursorDown:function(){this._moveCursor(1)},getSuggestionUnderCursor:function(){var a=this._getSuggestions().filter(".tt-is-under-cursor").first();return a.length>0?e(a):null},getFirstSuggestion:function(){var a=this._getSuggestions().first();return a.length>0?e(a):null},renderSuggestions:function(b,d){var e,h,i,j,k,l="tt-dataset-"+b.name,m='<div class="tt-suggestion">%body</div>',n=this.$menu.find("."+l);0===n.length&&(h=a(f.suggestionsList).css(g.suggestionsList),n=a("<div></div>").addClass(l).append(b.header).append(h).append(b.footer).appendTo(this.$menu)),d.length>0?(this.isEmpty=!1,this.isOpen&&this._show(),i=document.createElement("div"),j=document.createDocumentFragment(),c.each(d,function(c,d){d.dataset=b.name,e=b.template(d.datum),i.innerHTML=m.replace("%body",e),k=a(i.firstChild).css(g.suggestion).data("suggestion",d),k.children().each(function(){a(this).css(g.suggestionChild)}),j.appendChild(k[0])}),n.show().find(".tt-suggestions").html(j)):this.clearSuggestions(b.name),this.trigger("suggestionsRendered")},clearSuggestions:function(a){var b=a?this.$menu.find(".tt-dataset-"+a):this.$menu.find('[class^="tt-dataset-"]'),c=b.find(".tt-suggestions");b.hide(),c.empty(),0===this._getSuggestions().length&&(this.isEmpty=!0,this._hide())}}),b}(),l=function(){function b(a){var b,d,f;c.bindAll(this),this.$node=e(a.input),this.datasets=a.datasets,this.dir=null,this.eventBus=a.eventBus,b=this.$node.find(".tt-dropdown-menu"),d=this.$node.find(".tt-query"),f=this.$node.find(".tt-hint"),this.dropdownView=new k({menu:b}).on("suggestionSelected",this._handleSelection).on("cursorMoved",this._clearHint).on("cursorMoved",this._setInputValueToSuggestionUnderCursor).on("cursorRemoved",this._setInputValueToQuery).on("cursorRemoved",this._updateHint).on("suggestionsRendered",this._updateHint).on("opened",this._updateHint).on("closed",this._clearHint).on("opened closed",this._propagateEvent),this.inputView=new j({input:d,hint:f}).on("focused",this._openDropdown).on("blured",this._closeDropdown).on("blured",this._setInputValueToQuery).on("enterKeyed tabKeyed",this._handleSelection).on("queryChanged",this._clearHint).on("queryChanged",this._clearSuggestions).on("queryChanged",this._getSuggestions).on("whitespaceChanged",this._updateHint).on("queryChanged whitespaceChanged",this._openDropdown).on("queryChanged whitespaceChanged",this._setLanguageDirection).on("escKeyed",this._closeDropdown).on("escKeyed",this._setInputValueToQuery).on("tabKeyed upKeyed downKeyed",this._managePreventDefault).on("upKeyed downKeyed",this._moveDropdownCursor).on("upKeyed downKeyed",this._openDropdown).on("tabKeyed leftKeyed rightKeyed",this._autocomplete)}function e(b){var c=a(g.wrapper),d=a(g.dropdown),e=a(b),f=a(g.hint);c=c.css(h.wrapper),d=d.css(h.dropdown),f.css(h.hint).css({backgroundAttachment:e.css("background-attachment"),backgroundClip:e.css("background-clip"),backgroundColor:e.css("background-color"),backgroundImage:e.css("background-image"),backgroundOrigin:e.css("background-origin"),backgroundPosition:e.css("background-position"),backgroundRepeat:e.css("background-repeat"),backgroundSize:e.css("background-size")}),e.data("ttAttrs",{dir:e.attr("dir"),autocomplete:e.attr("autocomplete"),spellcheck:e.attr("spellcheck"),style:e.attr("style")}),e.addClass("tt-query").attr({autocomplete:"off",spellcheck:!1}).css(h.query);try{!e.attr("dir")&&e.attr("dir","auto")}catch(i){}return e.wrap(c).parent().prepend(f).append(d)}function f(a){var b=a.find(".tt-query");c.each(b.data("ttAttrs"),function(a,d){c.isUndefined(d)?b.removeAttr(a):b.attr(a,d)}),b.detach().removeData("ttAttrs").removeClass("tt-query").insertAfter(a),a.remove()}var g={wrapper:'<span class="twitter-typeahead"></span>',hint:'<input class="tt-hint" type="text" autocomplete="off" spellcheck="off" disabled>',dropdown:'<span class="tt-dropdown-menu"></span>'},h={wrapper:{position:"relative",display:"inline-block"},hint:{position:"absolute",top:"0",left:"0",borderColor:"transparent",boxShadow:"none"},query:{position:"relative",verticalAlign:"top",backgroundColor:"transparent"},dropdown:{position:"absolute",top:"100%",left:"0",zIndex:"100",display:"none"}};return c.isMsie()&&c.mixin(h.query,{backgroundImage:"url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"}),c.isMsie()&&c.isMsie()<=7&&(c.mixin(h.wrapper,{display:"inline",zoom:"1"}),c.mixin(h.query,{marginTop:"-1px"})),c.mixin(b.prototype,d,{_managePreventDefault:function(a){var b,c,d=a.data,e=!1;switch(a.type){case"tabKeyed":b=this.inputView.getHintValue(),c=this.inputView.getInputValue(),e=b&&b!==c;break;case"upKeyed":case"downKeyed":e=!d.shiftKey&&!d.ctrlKey&&!d.metaKey}e&&d.preventDefault()},_setLanguageDirection:function(){var a=this.inputView.getLanguageDirection();a!==this.dir&&(this.dir=a,this.$node.css("direction",a),this.dropdownView.setLanguageDirection(a))},_updateHint:function(){var a,b,d,e,f,g=this.dropdownView.getFirstSuggestion(),h=g?g.value:null,i=this.dropdownView.isVisible(),j=this.inputView.isOverflow();h&&i&&!j&&(a=this.inputView.getInputValue(),b=a.replace(/\s{2,}/g," ").replace(/^\s+/g,""),d=c.escapeRegExChars(b),e=new RegExp("^(?:"+d+")(.*$)","i"),f=e.exec(h),this.inputView.setHintValue(a+(f?f[1]:"")))},_clearHint:function(){this.inputView.setHintValue("")},_clearSuggestions:function(){this.dropdownView.clearSuggestions()},_setInputValueToQuery:function(){this.inputView.setInputValue(this.inputView.getQuery())},_setInputValueToSuggestionUnderCursor:function(a){var b=a.data;this.inputView.setInputValue(b.value,!0)},_openDropdown:function(){this.dropdownView.open()},_closeDropdown:function(a){this.dropdownView["blured"===a.type?"closeUnlessMouseIsOverDropdown":"close"]()},_moveDropdownCursor:function(a){var b=a.data;b.shiftKey||b.ctrlKey||b.metaKey||this.dropdownView["upKeyed"===a.type?"moveCursorUp":"moveCursorDown"]()},_handleSelection:function(a){var b="suggestionSelected"===a.type,d=b?a.data:this.dropdownView.getSuggestionUnderCursor();d&&(this.inputView.setInputValue(d.value),b?this.inputView.focus():a.data.preventDefault(),b&&c.isMsie()?c.defer(this.dropdownView.close):this.dropdownView.close(),this.eventBus.trigger("selected",d.datum,d.dataset))},_getSuggestions:function(){var a=this,b=this.inputView.getQuery();c.isBlankString(b)||c.each(this.datasets,function(c,d){d.getSuggestions(b,function(c){b===a.inputView.getQuery()&&a.dropdownView.renderSuggestions(d,c)})})},_autocomplete:function(a){var b,c,d,e,f;("rightKeyed"!==a.type&&"leftKeyed"!==a.type||(b=this.inputView.isCursorAtEnd(),c="ltr"===this.inputView.getLanguageDirection()?"leftKeyed"===a.type:"rightKeyed"===a.type,b&&!c))&&(d=this.inputView.getQuery(),e=this.inputView.getHintValue(),""!==e&&d!==e&&(f=this.dropdownView.getFirstSuggestion(),this.inputView.setInputValue(f.value),this.eventBus.trigger("autocompleted",f.datum,f.dataset)))},_propagateEvent:function(a){this.eventBus.trigger(a.type)},destroy:function(){this.inputView.destroy(),this.dropdownView.destroy(),f(this.$node),this.$node=null},setQuery:function(a){this.inputView.setQuery(a),this.inputView.setInputValue(a),this._clearHint(),this._clearSuggestions(),this._getSuggestions()}}),b}();!function(){var b,d={},f="ttView";b={initialize:function(b){function g(){var b,d=a(this),g=new e({el:d});b=c.map(h,function(a){return a.initialize()}),d.data(f,new l({input:d,eventBus:g=new e({el:d}),datasets:h})),a.when.apply(a,b).always(function(){c.defer(function(){g.trigger("initialized")})})}var h;return b=c.isArray(b)?b:[b],0===b.length&&a.error("no datasets provided"),h=c.map(b,function(a){var b=d[a.name]?d[a.name]:new i(a);return a.name&&(d[a.name]=b),b}),this.each(g)},destroy:function(){function b(){var b=a(this),c=b.data(f);c&&(c.destroy(),b.removeData(f))}return this.each(b)},setQuery:function(b){function c(){var c=a(this).data(f);c&&c.setQuery(b)}return this.each(c)}},jQuery.fn.typeahead=function(a){return b[a]?b[a].apply(this,[].slice.call(arguments,1)):b.initialize.apply(this,arguments)}}()}(window.jQuery);;
(function(){function D(){var a="{}";if("userDataBehavior"==k){d.load("jStorage");try{a=d.getAttribute("jStorage")}catch(b){}try{r=d.getAttribute("jStorage_update")}catch(c){}h.jStorage=a}E();x();F()}function u(){var a;clearTimeout(G);G=setTimeout(function(){if("localStorage"==k||"globalStorage"==k)a=h.jStorage_update;else if("userDataBehavior"==k){d.load("jStorage");try{a=d.getAttribute("jStorage_update")}catch(b){}}if(a&&a!=r){r=a;var l=m.parse(m.stringify(c.__jstorage_meta.CRC32)),p;D();p=m.parse(m.stringify(c.__jstorage_meta.CRC32));
var e,z=[],f=[];for(e in l)l.hasOwnProperty(e)&&(p[e]?l[e]!=p[e]&&"2."==String(l[e]).substr(0,2)&&z.push(e):f.push(e));for(e in p)p.hasOwnProperty(e)&&(l[e]||z.push(e));s(z,"updated");s(f,"deleted")}},25)}function s(a,b){a=[].concat(a||[]);if("flushed"==b){a=[];for(var c in g)g.hasOwnProperty(c)&&a.push(c);b="deleted"}c=0;for(var p=a.length;c<p;c++){if(g[a[c]])for(var e=0,d=g[a[c]].length;e<d;e++)g[a[c]][e](a[c],b);if(g["*"])for(e=0,d=g["*"].length;e<d;e++)g["*"][e](a[c],b)}}function v(){var a=(+new Date).toString();
if("localStorage"==k||"globalStorage"==k)try{h.jStorage_update=a}catch(b){k=!1}else"userDataBehavior"==k&&(d.setAttribute("jStorage_update",a),d.save("jStorage"));u()}function E(){if(h.jStorage)try{c=m.parse(String(h.jStorage))}catch(a){h.jStorage="{}"}else h.jStorage="{}";A=h.jStorage?String(h.jStorage).length:0;c.__jstorage_meta||(c.__jstorage_meta={});c.__jstorage_meta.CRC32||(c.__jstorage_meta.CRC32={})}function w(){if(c.__jstorage_meta.PubSub){for(var a=+new Date-2E3,b=0,l=c.__jstorage_meta.PubSub.length;b<
l;b++)if(c.__jstorage_meta.PubSub[b][0]<=a){c.__jstorage_meta.PubSub.splice(b,c.__jstorage_meta.PubSub.length-b);break}c.__jstorage_meta.PubSub.length||delete c.__jstorage_meta.PubSub}try{h.jStorage=m.stringify(c),d&&(d.setAttribute("jStorage",h.jStorage),d.save("jStorage")),A=h.jStorage?String(h.jStorage).length:0}catch(p){}}function q(a){if(!a||"string"!=typeof a&&"number"!=typeof a)throw new TypeError("Key name must be string or numeric");if("__jstorage_meta"==a)throw new TypeError("Reserved key name");
return!0}function x(){var a,b,l,d,e=Infinity,h=!1,f=[];clearTimeout(H);if(c.__jstorage_meta&&"object"==typeof c.__jstorage_meta.TTL){a=+new Date;l=c.__jstorage_meta.TTL;d=c.__jstorage_meta.CRC32;for(b in l)l.hasOwnProperty(b)&&(l[b]<=a?(delete l[b],delete d[b],delete c[b],h=!0,f.push(b)):l[b]<e&&(e=l[b]));Infinity!=e&&(H=setTimeout(x,e-a));h&&(w(),v(),s(f,"deleted"))}}function F(){var a;if(c.__jstorage_meta.PubSub){var b,l=B;for(a=c.__jstorage_meta.PubSub.length-1;0<=a;a--)if(b=c.__jstorage_meta.PubSub[a],
b[0]>B){var l=b[0],d=b[1];b=b[2];if(t[d])for(var e=0,h=t[d].length;e<h;e++)t[d][e](d,m.parse(m.stringify(b)))}B=l}}var y=window.jQuery||window.$||(window.$={}),m={parse:window.JSON&&(window.JSON.parse||window.JSON.decode)||String.prototype.evalJSON&&function(a){return String(a).evalJSON()}||y.parseJSON||y.evalJSON,stringify:Object.toJSON||window.JSON&&(window.JSON.stringify||window.JSON.encode)||y.toJSON};if(!("parse"in m&&"stringify"in m))throw Error("No JSON support found, include //cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2.js to page");
var c={__jstorage_meta:{CRC32:{}}},h={jStorage:"{}"},d=null,A=0,k=!1,g={},G=!1,r=0,t={},B=+new Date,H,C={isXML:function(a){return(a=(a?a.ownerDocument||a:0).documentElement)?"HTML"!==a.nodeName:!1},encode:function(a){if(!this.isXML(a))return!1;try{return(new XMLSerializer).serializeToString(a)}catch(b){try{return a.xml}catch(c){}}return!1},decode:function(a){var b="DOMParser"in window&&(new DOMParser).parseFromString||window.ActiveXObject&&function(a){var b=new ActiveXObject("Microsoft.XMLDOM");b.async=
"false";b.loadXML(a);return b};if(!b)return!1;a=b.call("DOMParser"in window&&new DOMParser||window,a,"text/xml");return this.isXML(a)?a:!1}};y.jStorage={version:"0.4.4",set:function(a,b,d){q(a);d=d||{};if("undefined"==typeof b)return this.deleteKey(a),b;if(C.isXML(b))b={_is_xml:!0,xml:C.encode(b)};else{if("function"==typeof b)return;b&&"object"==typeof b&&(b=m.parse(m.stringify(b)))}c[a]=b;for(var h=c.__jstorage_meta.CRC32,e=m.stringify(b),k=e.length,f=2538058380^k,g=0,n;4<=k;)n=e.charCodeAt(g)&255|
(e.charCodeAt(++g)&255)<<8|(e.charCodeAt(++g)&255)<<16|(e.charCodeAt(++g)&255)<<24,n=1540483477*(n&65535)+((1540483477*(n>>>16)&65535)<<16),n^=n>>>24,n=1540483477*(n&65535)+((1540483477*(n>>>16)&65535)<<16),f=1540483477*(f&65535)+((1540483477*(f>>>16)&65535)<<16)^n,k-=4,++g;switch(k){case 3:f^=(e.charCodeAt(g+2)&255)<<16;case 2:f^=(e.charCodeAt(g+1)&255)<<8;case 1:f^=e.charCodeAt(g)&255,f=1540483477*(f&65535)+((1540483477*(f>>>16)&65535)<<16)}f^=f>>>13;f=1540483477*(f&65535)+((1540483477*(f>>>16)&
65535)<<16);h[a]="2."+((f^f>>>15)>>>0);this.setTTL(a,d.TTL||0);s(a,"updated");return b},get:function(a,b){q(a);return a in c?c[a]&&"object"==typeof c[a]&&c[a]._is_xml?C.decode(c[a].xml):c[a]:"undefined"==typeof b?null:b},deleteKey:function(a){q(a);return a in c?(delete c[a],"object"==typeof c.__jstorage_meta.TTL&&a in c.__jstorage_meta.TTL&&delete c.__jstorage_meta.TTL[a],delete c.__jstorage_meta.CRC32[a],w(),v(),s(a,"deleted"),!0):!1},setTTL:function(a,b){var d=+new Date;q(a);b=Number(b)||0;return a in
c?(c.__jstorage_meta.TTL||(c.__jstorage_meta.TTL={}),0<b?c.__jstorage_meta.TTL[a]=d+b:delete c.__jstorage_meta.TTL[a],w(),x(),v(),!0):!1},getTTL:function(a){var b=+new Date;q(a);return a in c&&c.__jstorage_meta.TTL&&c.__jstorage_meta.TTL[a]?(a=c.__jstorage_meta.TTL[a]-b)||0:0},flush:function(){c={__jstorage_meta:{CRC32:{}}};w();v();s(null,"flushed");return!0},storageObj:function(){function a(){}a.prototype=c;return new a},index:function(){var a=[],b;for(b in c)c.hasOwnProperty(b)&&"__jstorage_meta"!=
b&&a.push(b);return a},storageSize:function(){return A},currentBackend:function(){return k},storageAvailable:function(){return!!k},listenKeyChange:function(a,b){q(a);g[a]||(g[a]=[]);g[a].push(b)},stopListening:function(a,b){q(a);if(g[a])if(b)for(var c=g[a].length-1;0<=c;c--)g[a][c]==b&&g[a].splice(c,1);else delete g[a]},subscribe:function(a,b){a=(a||"").toString();if(!a)throw new TypeError("Channel not defined");t[a]||(t[a]=[]);t[a].push(b)},publish:function(a,b){a=(a||"").toString();if(!a)throw new TypeError("Channel not defined");
c.__jstorage_meta||(c.__jstorage_meta={});c.__jstorage_meta.PubSub||(c.__jstorage_meta.PubSub=[]);c.__jstorage_meta.PubSub.unshift([+new Date,a,b]);w();v()},reInit:function(){D()}};(function(){var a=!1;if("localStorage"in window)try{window.localStorage.setItem("_tmptest","tmpval"),a=!0,window.localStorage.removeItem("_tmptest")}catch(b){}if(a)try{window.localStorage&&(h=window.localStorage,k="localStorage",r=h.jStorage_update)}catch(c){}else if("globalStorage"in window)try{window.globalStorage&&(h=
"localhost"==window.location.hostname?window.globalStorage["localhost.localdomain"]:window.globalStorage[window.location.hostname],k="globalStorage",r=h.jStorage_update)}catch(g){}else if(d=document.createElement("link"),d.addBehavior){d.style.behavior="url(#default#userData)";document.getElementsByTagName("head")[0].appendChild(d);try{d.load("jStorage")}catch(e){d.setAttribute("jStorage","{}"),d.save("jStorage"),d.load("jStorage")}a="{}";try{a=d.getAttribute("jStorage")}catch(m){}try{r=d.getAttribute("jStorage_update")}catch(f){}h.jStorage=
a;k="userDataBehavior"}else{d=null;return}E();x();"localStorage"==k||"globalStorage"==k?"addEventListener"in window?window.addEventListener("storage",u,!1):document.attachEvent("onstorage",u):"userDataBehavior"==k&&setInterval(u,1E3);F();"addEventListener"in window&&window.addEventListener("pageshow",function(a){a.persisted&&u()},!1)})()})();;
(function($){$.browserTest=function(a,z){var u='unknown',x='X',m=function(r,h){for(var i=0;i<h.length;i=i+1){r=r.replace(h[i][0],h[i][1]);}return r;},c=function(i,a,b,c){var r={name:m((a.exec(i)||[u,u])[1],b)};r[r.name]=true;r.version=(c.exec(i)||[x,x,x,x])[3];if(r.name.match(/safari/)&&r.version>400){r.version='2.0';}if(r.name==='presto'){r.version=($.browser.version>9.27)?'futhark':'linear_b';}r.versionNumber=parseFloat(r.version,10)||0;r.versionX=(r.version!==x)?(r.version+'').substr(0,1):x;r.className=r.name+r.versionX;return r;};a=(a.match(/Opera|Navigator|Minefield|KHTML|Chrome/)?m(a,[[/(Firefox|MSIE|KHTML,\slike\sGecko|Konqueror)/,''],['Chrome Safari','Chrome'],['KHTML','Konqueror'],['Minefield','Firefox'],['Navigator','Netscape']]):a).toLowerCase();$.browser=$.extend((!z)?$.browser:{},c(a,/(camino|chrome|firefox|netscape|konqueror|lynx|msie|opera|safari)/,[],/(camino|chrome|firefox|netscape|netscape6|opera|version|konqueror|lynx|msie|safari)(\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|$)/));$.layout=c(a,/(gecko|konqueror|msie|opera|webkit)/,[['konqueror','khtml'],['msie','trident'],['opera','presto']],/(applewebkit|rv|konqueror|msie)(\:|\/|\s)([a-z0-9\.]*?)(\;|\)|\s)/);$.os={name:(/(win|mac|linux|sunos|solaris|iphone)/.exec(navigator.platform.toLowerCase())||[u])[0].replace('sunos','solaris')};if(!z){$('html').addClass([$.os.name,$.browser.name,$.browser.className,$.layout.name,$.layout.className].join(' '));}};$.browserTest(navigator.userAgent);})(jQuery);;
/*
 * jQuery BBQ: Back Button & Query Library - v1.2.1 - 2/17/2010
 * http://benalman.com/projects/jquery-bbq-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,p){var i,m=Array.prototype.slice,r=decodeURIComponent,a=$.param,c,l,v,b=$.bbq=$.bbq||{},q,u,j,e=$.event.special,d="hashchange",A="querystring",D="fragment",y="elemUrlAttr",g="location",k="href",t="src",x=/^.*\?|#.*$/g,w=/^.*\#/,h,C={};function E(F){return typeof F==="string"}function B(G){var F=m.call(arguments,1);return function(){return G.apply(this,F.concat(m.call(arguments)))}}function n(F){return F.replace(/^[^#]*#?(.*)$/,"$1")}function o(F){return F.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/,"$1")}function f(H,M,F,I,G){var O,L,K,N,J;if(I!==i){K=F.match(H?/^([^#]*)\#?(.*)$/:/^([^#?]*)\??([^#]*)(#?.*)/);J=K[3]||"";if(G===2&&E(I)){L=I.replace(H?w:x,"")}else{N=l(K[2]);I=E(I)?l[H?D:A](I):I;L=G===2?I:G===1?$.extend({},I,N):$.extend({},N,I);L=a(L);if(H){L=L.replace(h,r)}}O=K[1]+(H?"#":L||!K[1]?"?":"")+L+J}else{O=M(F!==i?F:p[g][k])}return O}a[A]=B(f,0,o);a[D]=c=B(f,1,n);c.noEscape=function(G){G=G||"";var F=$.map(G.split(""),encodeURIComponent);h=new RegExp(F.join("|"),"g")};c.noEscape(",/");$.deparam=l=function(I,F){var H={},G={"true":!0,"false":!1,"null":null};$.each(I.replace(/\+/g," ").split("&"),function(L,Q){var K=Q.split("="),P=r(K[0]),J,O=H,M=0,R=P.split("]["),N=R.length-1;if(/\[/.test(R[0])&&/\]$/.test(R[N])){R[N]=R[N].replace(/\]$/,"");R=R.shift().split("[").concat(R);N=R.length-1}else{N=0}if(K.length===2){J=r(K[1]);if(F){J=J&&!isNaN(J)?+J:J==="undefined"?i:G[J]!==i?G[J]:J}if(N){for(;M<=N;M++){P=R[M]===""?O.length:R[M];O=O[P]=M<N?O[P]||(R[M+1]&&isNaN(R[M+1])?{}:[]):J}}else{if($.isArray(H[P])){H[P].push(J)}else{if(H[P]!==i){H[P]=[H[P],J]}else{H[P]=J}}}}else{if(P){H[P]=F?i:""}}});return H};function z(H,F,G){if(F===i||typeof F==="boolean"){G=F;F=a[H?D:A]()}else{F=E(F)?F.replace(H?w:x,""):F}return l(F,G)}l[A]=B(z,0);l[D]=v=B(z,1);$[y]||($[y]=function(F){return $.extend(C,F)})({a:k,base:k,iframe:t,img:t,input:t,form:"action",link:k,script:t});j=$[y];function s(I,G,H,F){if(!E(H)&&typeof H!=="object"){F=H;H=G;G=i}return this.each(function(){var L=$(this),J=G||j()[(this.nodeName||"").toLowerCase()]||"",K=J&&L.attr(J)||"";L.attr(J,a[I](K,H,F))})}$.fn[A]=B(s,A);$.fn[D]=B(s,D);b.pushState=q=function(I,F){if(E(I)&&/^#/.test(I)&&F===i){F=2}var H=I!==i,G=c(p[g][k],H?I:{},H?F:2);p[g][k]=G+(/#/.test(G)?"":"#")};b.getState=u=function(F,G){return F===i||typeof F==="boolean"?v(F):v(G)[F]};b.removeState=function(F){var G={};if(F!==i){G=u();$.each($.isArray(F)?F:arguments,function(I,H){delete G[H]})}q(G,2)};e[d]=$.extend(e[d],{add:function(F){var H;function G(J){var I=J[D]=c();J.getState=function(K,L){return K===i||typeof K==="boolean"?l(I,K):l(I,L)[K]};H.apply(this,arguments)}if($.isFunction(F)){H=F;return G}else{H=F.handler;F.handler=G}}})})(jQuery,this);
/*
 * jQuery hashchange event - v1.2 - 2/11/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,i,b){var j,k=$.event.special,c="location",d="hashchange",l="href",f=$.browser,g=document.documentMode,h=f.msie&&(g===b||g<8),e="on"+d in i&&!h;function a(m){m=m||i[c][l];return m.replace(/^[^#]*#?(.*)$/,"$1")}$[d+"Delay"]=100;k[d]=$.extend(k[d],{setup:function(){if(e){return false}$(j.start)},teardown:function(){if(e){return false}$(j.stop)}});j=(function(){var m={},r,n,o,q;function p(){o=q=function(s){return s};if(h){n=$('<iframe src="javascript:0"/>').hide().insertAfter("body")[0].contentWindow;q=function(){return a(n.document[c][l])};o=function(u,s){if(u!==s){var t=n.document;t.open().close();t[c].hash="#"+u}};o(a())}}m.start=function(){if(r){return}var t=a();o||p();(function s(){var v=a(),u=q(t);if(v!==t){o(t=v,u);$(i).trigger(d)}else{if(u!==t){i[c][l]=i[c][l].replace(/#.*/,"")+"#"+u}}r=setTimeout(s,$[d+"Delay"])})()};m.stop=function(){if(!n){r&&clearTimeout(r);r=0}};return m})()})(jQuery,this);;
/**
 * @file
 * This plugin handles the hexagonal tesselation of an unordered list.
 *
 * Required markup:
 * <ul><li>[...]</li>[...]</ul>
 */
(function($) {
  "use strict";

  // Check if a browser is able to do transformations (like rotate).
  // If not we shouldn't use tesselation.
  var prefixes = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' '),
  el = document.createElement('div');

  $.browser.canTransform = false;
  for (var i = 0; i < prefixes.length; i++) {
    $.browser.canTransform = typeof el.style[prefixes[i]] !== "undefined" || $.browser.canTransform;
  }

  // For some reasons hexagons do not work in android.
  if (/android/i.test(navigator.userAgent.toLowerCase())) {
    $.browser.canTransform = false;
  }

  $.fn.labHexTess = function(options) {
    if (!$.browser.canTransform) {
      return this;
    }

    var x0, y0, settings,
    defaults = {
      width : 250,
      height : 217,
      margin : 10,
      selector : '> div',
      organic : []
    };

    settings = $.extend(defaults, options);

    y0 = 0.5 * (settings.height + settings.margin);
    x0 = 0.75 * (settings.width + settings.margin);

    function calcX(i, isEven) {
      var xNull = isEven ? 0.5 * x0 : 1.5 * x0;
      return 2 * x0 * i + xNull - (settings.width / 2);
    }

    function calcY(i, isEven) {
      return y0 * i + y0 - (settings.height / 2);
    }

    function update($container, $elements) {
      var $elem,
      numElem = $elements.size(),
      maxWidth = $container.width(),
      x = 0,
      y = 0,
      xPos = 0,
      yPos = 0,
      counter = 0,
      isEven = false,
      maxElemXEven = Math.ceil((maxWidth - x0) / (2 * x0)),
      maxElemXOdd = Math.ceil((maxWidth - 2 * x0) / (2 * x0));

      while (counter < numElem) {
        $elem = $($elements.get(counter));
        if (!((maxElemXEven < 2 || maxElemXOdd < 2) && $elem.hasClass('organic'))) {
          isEven = (y % 2);

          xPos = calcX(x, isEven);
          yPos = calcY(y, isEven);

          $elem.css({
            top : yPos,
            left : xPos,
            position : 'absolute'
          });

          x++;
          if (isEven && x >= maxElemXEven || !isEven && x >= maxElemXOdd) {
            y++;
            x = 0;
          }
        }

        counter++;
      }

      $container.css({
        height : y * y0 + 2 * y0,
        position : 'relative'
      });
    }

    return this.each(function() {
      var $container = $(this),
      $elements = $container.find(settings.selector),
      resizeTimeout,
      resizeWait = 500;

      if (settings.organic.length > 0) {
        for (var i = 0; i < settings.organic.length; i++) {
          $($elements.get(settings.organic[i]))
            .before('<div class="views-row organic"></div>');
        }

        $elements = $container.find(settings.selector);
      }

      $container.addClass('wom-hextess');
      $elements.addClass('wom-hextess-item');

      update($container, $elements);

      $(window).resize(function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
          update($container, $elements)
        });
      });
    });
  };
})(jQuery);


;
/**
 * @file
 * A JavaScript file for the theme.
 *
 * @see wom.info
 */
(function($, Drupal, window, document, undefined) {
  var options = {};
  Drupal.behaviors.womBlog = {
    attach: function (context, settings) {
      $('article.node-blog-post').each(function() {
        Drupal.updateFlexslider($(this).attr('id'));
      });

      if ($('article.node-blog-post').size() > 0) {
        $('.active-page div').addClass('active');

        var maxPagerLinks = 6;
        var maxRange = Math.floor((maxPagerLinks - 2) / 2);
        var $elements = $('a.mf-cluster-nav-list-item');
        var $elementParents = $elements.parent();

        var currentPage = $elements.index($(".active-page"))

        if (currentPage > 0) {
          $('.item-list > a:first').addClass('mf-cluster-nav-prev');
        }
        if (currentPage < $elements.length - 1) {
          $('.item-list > a:last').addClass('mf-cluster-nav-next');
        }

        if ($elements.length > maxPagerLinks) {
          $elementParents
          .removeClass('element-invisible')
          .removeClass('edge-right')
          .removeClass('edge-left');

          $elements.each(function(index) {
            var $parent = $(this).parent();

            if (index !== 0 && index !== ($elements.length - 1) && Math.abs(index - currentPage) > maxRange) {
              $parent.addClass('element-invisible');
            }
            else if (index === currentPage + maxRange && index < $elements.length - 2) {
              $parent.addClass('edge-right');
            }
            else if (index === currentPage - maxRange && index > 1) {
              $parent.addClass('edge-left');
            }
          });
        }
      }
    }
  };
})(jQuery, Drupal, this, this.document);;
/**
 * @file
 * A JavaScript file for the theme.
 *
 * @see wom.info
 */
(function($, Drupal, window, document, undefined) {
  var options = {};

  /**
   * Adds slide overlay functions to all enabled links.
   * Enable links by adding a slide-overlay-btn class to it.
   */
  Drupal.behaviors.labSlideOverlay = {
    attach: function (context, settings) {
      // Check for an active slide overlay container.
      // If none is present create a basic one.
      var $slideOverlay = $('#slide-overlay');

      if ($slideOverlay.size() <= 0) {
        // Basic markup.
        $slideOverlay = $('<div>').attr('id' ,'slide-overlay');
        $slideOverlay.append($('<div>').addClass('slide-overlay-head')
          .append($('<div>').addClass('content')));
        $slideOverlay.append($('<div>').addClass('slide-overlay-body')
          .append($('<div>').addClass('content scrollable')));
        $slideOverlay.append($('<div>').addClass('slide-overlay-foot')
          .append($('<div>').addClass('content')));
        $slideOverlay.append($('<div>').addClass('slide-overlay-btns'));

        // Buttons.
        $slideOverlay.find('.slide-overlay-btns')
          .append($('<a>').addClass('slide-overlay-btn-pdf btn').html(Drupal.t('Print as PDF')))
          .append($('<a>').addClass('slide-overlay-btn-close btn').html(Drupal.t('Close')));

        // Append the whole stuff to the body.
        // Also we need an overlay to click on once inside the overlay.
        $('body').append($slideOverlay);
        $('body').append($('<div>').attr('id', 'slide-overlay-overlay'));
      }

      // Add the onclick event to all available slide overlay links.
      // Those links may describe their behavior by using attributes.
      $('a.slide-overlay-btn').not('.processed')
      .addClass('processed')
      .click(function(e) {
        var newContent,
        cssOptions = {},
        animOptions = {};

        options = {
          speed : 300,
          path : $(this).attr('href'),
          print : $(this).attr('data-print'),
          wrapper : '#' + $(this).attr('data-wrapper'),
          ajax : parseInt($(this).attr('data-ajax'), 10) === 1 ? true : false,
          position : $(this).attr('data-position') === 'right' ? 'right' : 'left',
          oppPosition : $(this).attr('data-position') === 'right' ? 'left' : 'right',
        };

        // Add an active class so we may style this button.
        $('a.slide-overlay-btn').removeClass('active');
        $(this).addClass('active');

        // Remove all previously added classes.
        // Reset the container according to the links attributes.
        cssOptions[options.position] = '-100%';
        cssOptions[options.oppPosition] = 'auto';

        $slideOverlay.css(cssOptions);
        $slideOverlay.removeClass('left right print');
        $slideOverlay.find('.slide-overlay-head, .slide-overlay-body, .slide-overlay-foot').find('.content').html('');

        // Check if a print link is required.
        if (options.print) {
          $slideOverlay.addClass('print');
          $slideOverlay.find('.slide-overlay-btn-pdf')
            .attr('href', options.print);
        }

        // Add class of this slide's position.
        $slideOverlay.addClass(options.position);

        // No try to fetch the content, either per ajax or per content request.
        // @todo: Only do this if the content differs.
        animOptions[options.position] = 0;
        $slideOverlay.addClass('loading');
        $slideOverlay.animate(animOptions, options.speed);

        if (options.ajax === true) {
          options.url = options.path + ' ' + options.wrapper + ' > *';
          $slideOverlay.find('.slide-overlay-body .content').load(options.url, function() {
            $slideOverlay.removeClass('loading');
            $('body').addClass('slide-overlay-active');

            Drupal.attachBehaviors();

            // Move every content where it belongs.
            $slideOverlay.find('.slide-overlay-to-head')
              .appendTo($slideOverlay.find('.slide-overlay-head .content'));
            $slideOverlay.find('.slide-overlay-to-foot')
              .appendTo($slideOverlay.find('.slide-overlay-foot .content'));
            $slideOverlay.find('#page-title').remove();
          });
        }
        else {
          newContent = $(options.wrapper).html();
          $slideOverlay.find('.slide-overlay-body .content')
            .html(newContent);

          $slideOverlay.removeClass('loading');
          $('body').addClass('slide-overlay-active');

          Drupal.attachBehaviors();

          // Move every content where it belongs.
          $slideOverlay.find('.slide-overlay-to-head')
            .appendTo($slideOverlay.find('.slide-overlay-head .content'));
          $slideOverlay.find('.slide-overlay-to-foot')
            .appendTo($slideOverlay.find('.slide-overlay-foot .content'));
          $slideOverlay.find('#page-title').remove();
        }

        e.preventDefault();
      });

      // Close the overlay on click of the close button or the overlay-overlay.
      $('#slide-overlay-overlay, a.slide-overlay-btn-close').not('.processed')
      .addClass('processed')
      .click(function(e) {
        var animOptions = {};
        animOptions[options.position] = '-100%';
        $slideOverlay.animate(animOptions, options.speed);

        $('a.slide-overlay-btn').removeClass('active');
        $('body').removeClass('slide-overlay-active');
      });
    }
  };

  /**
   * Turns containers with the class "wom-dropdown"
   * into a collapsible area. Also adds a show/hide
   * button to the parent element.
   */
  Drupal.behaviors.labDropdown = {
    attach: function (context, settings) {
      $dropdowns = $('.wom-dropdown');
      $dropdowns.not('.processed').each(function() {
        var icons = '',
        $dropdown = $(this),
        $dropdownLink = $('<a>').addClass('wom-dropdown-link btn'),
        wrapper = $dropdown.attr('data-wrapper') || null;

        icons += '<span class="up">' + Drupal.t('Close') + '<span class="icon"></span></span>';
        icons += '<span class="down">' + Drupal.t('Show all') + '<span class="icon"></span></span>';

        $dropdownLink.html(icons).appendTo($dropdown.parent());
        $dropdownLink.click(function() {
          if ($dropdown.hasClass('active')) {
            $dropdown.removeClass('active');
            $dropdownLink.removeClass('active');
          }
          else {
            if (wrapper) {
              $(wrapper).find('.wom-dropdown, .wom-dropdown-link')
                .removeClass('active')
            }

            $dropdown.addClass('active');
            $dropdownLink.addClass('active');
          }
        });

        if ($dropdown.hasClass('active')) {
          $dropdownLink.addClass('active');
        }

        $dropdown.addClass('processed');
      });
    }
  };

  /**
   * Initializes the list switcher of the hexagonal views.
   */
  Drupal.behaviors.labListSwitcher = {
    attach: function (context, settings) {
      var $wrapper = $('.view-cluster-frontpage, .view-search-results'),
      $list = $('.view-cluster-frontpage.view-display-id-block_2, .view-search-results.view-display-id-block_1'),
      $preview = $('.view-cluster-frontpage.view-display-id-block_1, .view-search-results.view-display-id-page');

      if ($list.size() > 0 && $preview.size() > 0) {
        if (!$list.hasClass('switcher-processed')) {
          $list.addClass('switcher-processed');
          $preview.addClass('switcher-processed active');

          $('<div>').addClass('switcher-btns')
          .append($('<a>').addClass('switcher-btn hexagon-link text-left preview')
            .html('<span class="icon"><span class="text">' + Drupal.t('Preview') + '</span></span>'))
          .append($('<a>').addClass('switcher-btn hexagon-link text-top list')
            .html('<span class="icon"><span class="text">' + Drupal.t('List') + '</span></span>'))
          .prependTo($wrapper);

          // Make sure a clearer is inserted to prevent strange floating behavior.
          $('.switcher-btns').after('<div class="clear"></div>');

          $wrapper.find('.switcher-btn').click(function(e) {
            $wrapper.find('.switcher-btn').removeClass('active');
            $(this).addClass('active');

            if ($(this).hasClass('preview')) {
              $list.removeClass('active');
              $preview.addClass('active');
            }
            else {
              $preview.removeClass('active');
              $list.addClass('active');
            }

            e.preventDefault();
          });
        }
      }
    }
  };

  /**
   * Handle tooltips.
   */
  Drupal.behaviors.labTooltips = {
    attach: function (context, settings) {
      var ttTimeout,
      ttPadding = 20,
      ttTimeoutDelay = 250,

      $tooltips = $('.tooltip'),
      $hexTooltips = $('.tooltip-hex'),
      $normTooltips = $tooltips.not('.tooltip-hex'),

      $elements = $('a.hexagon-large, .tooltip-parent, .search-category-select-wrapper li.active-result, .search-header-info');

      $tooltips.each(function() {
        var $this = $(this);
        $this.data('margin-top', parseInt($this.css('margin-top'), 10));
        $this.data('margin-left', parseInt($this.css('margin-left'), 10));
      });

      $tooltips.not('.processed')
      .addClass('processed')
      .hover(function() {
        clearTimeout(ttTimeout);
      });

      $elements.not('.processed')
      .addClass('processed')
      .hover(function() {
        var $thisTooltip,
        horOverflow = 0,
        verOverflow = 0,
        ttOrgMarginTop = 0,
        ttOrgMarginLeft = 0,
        windowWidth = $(window).width(),
        windowHeight = $(window).height(),
        windowScrollTop = $(window).scrollTop(),
        windowScrollLeft = $(window).scrollLeft();

        if ($(this).hasClass('hexagon-large')) {
          $thisTooltip = $(this).closest('.views-row').find('.tooltip');
        }
        else {
          $thisTooltip = $(this).find('.tooltip');
        }

        if ($thisTooltip.size() > 0) {
          ttOrgMarginTop = $thisTooltip.data('margin-top'),
          ttOrgMarginLeft = $thisTooltip.data('margin-left');

          clearTimeout(ttTimeout);

          $tooltips.removeClass('tooltip-active');
          $thisTooltip.addClass('tooltip-active').css({
            'margin-top' : ttOrgMarginTop,
            'margin-left' : ttOrgMarginLeft
          });

          $thisTooltip
            .removeClass('overflow-hor')
            .removeClass('overflow-ver');

          verOverflow = windowWidth + windowScrollLeft;
          verOverflow -= $thisTooltip.offset().left + $thisTooltip.outerWidth();

          horOverflow = windowHeight + windowScrollTop;
          horOverflow -= $thisTooltip.offset().top + $thisTooltip.outerHeight();

          if (horOverflow < 0) {
            $thisTooltip.addClass('overflow-hor');
          }

          if (verOverflow < 0) {
            $thisTooltip.addClass('overflow-ver');
          }
        }
      }, function() {
        clearTimeout(ttTimeout);

        ttTimeout = setTimeout(function() {
          $tooltips.removeClass('tooltip-active');
        }, ttTimeoutDelay);
      })

      $tooltips.hover(function() {
        clearTimeout(ttTimeout);
      }, function() {
        clearTimeout(ttTimeout);

        ttTimeout = setTimeout(function() {
          $tooltips.removeClass('tooltip-active');
        }, ttTimeoutDelay);
      });
    }
  };

  /**
   * Displays a second version of the labtooltips.
   * Those are simpler & not clickable.
   */
  Drupal.behaviors.womSimpleTooltips = {
    attach: function (context, settings) {
      var $simpleElems = $('.simple-tt');
      $simpleElems.not('.simple-tt-processed').addClass('simple-tt-processed').hover(function() {
        var $element = $(this),

        // Get the element's dimensions.
        elementWidth = $element.outerWidth(),
        elementHeight = $element.outerHeight(),
        elementTitle = $element.attr('data-title'),

        // Create a new tooltip.
        $tooltip = $('<div>').addClass('simple-tooltip');

        if ($element.attr('data-height')) {
          elementHeight = parseInt($element.attr('data-height'), 10);
        }

        if (elementTitle !== '') {
          $tooltip.html(elementTitle).appendTo($('body'));

          // If the triggering element wants to add a custom class,
          // it can be defined inside a data-class attribute.
          if ($element.attr('data-class')) {
            $tooltip.wrapInner('<div class="' + $element.attr('data-class') + '"></div>');
          }

          $tooltip.css({
            top : Math.round($element.offset().top - $tooltip.height() - elementHeight),
            left : Math.round($element.offset().left + (elementWidth / 2))
          });
        }
      }, function() {
        $('.simple-tooltip').remove();
      });
    }
  };

  /**
   * Process all found input fields and textareas to add placeholders.
   * For browsers without placeholder support a plugin will be used.
   *
   * @link http://andrew-jones.com/jquery-placeholder-plugin/
   */
  Drupal.behaviors.womInputPlaceholder = {
    attach: function (context, settings) {
      var selector = 'input[placeholder], textarea[placeholder]';

      $('label').each(function() {
        var $element,
        elemID = $(this).attr('for');

        if (elemID) {
          $element = $('#' + elemID).not('input[type=radio], input[type=checkbox]');
          if ($element.size() > 0) {
            $element.attr('placeholder', $(this).text());
            $(this).hide();
          }
        }
      });

      // Check browser support for placeholder
      $.support.placeholder = 'placeholder' in document.createElement('input');
      if (!$.support.placeholder) {
        $(selector).each(function() {
          var $elem = $(this);
          if ($elem.val() == '') {
            $elem.val($elem.attr('placeholder'));
          }
        });

        $(selector).focus(function() {
          var $elem = $(this);
          if ($elem.val() === $elem.attr('placeholder')) {
            $elem.val('');
          }
        });

        $(selector).blur(function() {
          var $elem = $(this);
          if ($elem.val() === '') {
            $elem.val($elem.attr('placeholder'));
          }
        });

        $(selector).closest("form").submit(function() {
          $(this).find(selector).each(function() {
            var $elem = $(this);
            if ($elem.val() === $elem.attr('placeholder')) {
              $elem.val('');
            }
          });
        });
      }
    }
  };

  /**
   * Adjust scrollable containers height depending on the window height.
   * This should only run once, so we don't add a behavior.
   */
  $(document).ready(function() {
    var $body = $('body'),
    $scrollables = $('#content .scrollable');

    $(window).resize(function() {
      $scrollables.each(function() {
        var $scrollable = $(this),

        newScrollableHeight = $(window).height();
        newScrollableHeight -= $scrollable.offset().top;
        newScrollableHeight -= parseInt($scrollable.css('margin-bottom'), 10);

        $scrollable.css('max-height', newScrollableHeight);
      });
    });

    $(window).trigger('resize');

    // Add classes for the currently used browser.
    // Note that this isn't considered a good practise.
    $body.addClass('bop-' + $.browser.name + ' bop-' + $.browser.name + '-' + $.browser.versionNumber);

    // Add a class that tells us we are not able to do transforms.
    if (!$.browser.canTransform) {
      $body.addClass('no-hex');
    }

    // Add hover & click behavior for main menu.
    var is_touch_device = 'ontouchstart' in document.documentElement;
    if (!is_touch_device) {
      $('#block-system-main-menu').addClass('hover-active').hover(function() {
        var $menu = $(this);
        $menu.addClass('visible');
        $menu.find('h2 span.icon').addClass('active');

        clearTimeout(this.waitTimeout);
      }, function() {
        var $menu = $(this);

        this.waitTimeout = setTimeout(function() {
          $menu.removeClass('visible');
          $menu.find('h2 span.icon').removeClass('active');
        }, 500);
      });
    }
    else {
      // Fix for stupid android bug.
      $('#block-system-main-menu ul').hide();

      $('#block-system-main-menu h2:first').click(function(e) {
        var $menu = $('#block-system-main-menu');

        if ($menu.hasClass('visible')) {
          $menu.removeClass('visible');
          $menu.find('ul').hide();
          $menu.find('h2 span.icon').removeClass('active');
        }
        else {
          $menu.addClass('visible');
          $menu.find('ul').show();
          $menu.find('h2 span.icon').addClass('active');
        }

        e.preventDefault();
      });
    }
  });

})(jQuery, Drupal, this, this.document);
;
/**
 * @file
 * This file contains functions dealing with hexagonal lists
 * like for example the front page or the search results.
 */
(function($, Drupal, window, document, undefined) {
  $(document).ready(function() {
    var hexViews = 'body.front .view-cluster-frontpage';
    hexViews += ', .view-search-results .view-content';

    $(hexViews).labHexTess({
      selector : '.views-row',
      organic : [5, 5, 15, 15, 25, 25]
    });

    // Iterate over all images & preload them before reattaching.
    $('span[style*="background-image"]').each(function() {
      var $element = $(this),
      imageUrl = $.trim($element.css('background-image')),
      imagePath = imageUrl.match(/\(([^)]+)\)/)[1],
      image = new Image();

      $element.attr('style', '');
      image.onload = image.onerror = function() {
        $element.addClass('loaded').css('background-image', imageUrl);
      };

      image.src = imagePath;
    });
  });


})(jQuery, Drupal, this, this.document);;
/**
 * @file
 * A JavaScript file for the theme.
 *
 * @see wom.info
 */
(function($, Drupal, window, document, undefined) {
  var labClusterOverviewEnabled = false;

  /**
   * Used to generate a history from the user's actions.
   */
  Drupal.womHistory = function() {
    var wom = this,
    womNowUnix = new Date().getTime(),
    womTimeDiff = 86400000,
    womHistory = 'womHistory',
    womLastVisit = 'womLastVisit',

    // Storage for raw history items string.
    womLastVisitUnix = $.jStorage.get(womLastVisit, null),
    womHistoryStr = $.jStorage.get(womHistory, null),

    // Array of node ids.
    womHistoryArr = womHistoryStr ? womHistoryStr.split(',') : [];
    womLastVisitUnix = womLastVisitUnix ? womLastVisitUnix : womNowUnix;

    // Returns a list of all stored node ids.
    wom.getItems = function() {
      return womHistoryArr;
    };

    // Removes all stored items from the user's history.
    wom.flushHistory = function() {
      womHistoryStr = '';
      womHistoryArr = [];
      $.jStorage.set(womHistory, womHistoryStr);

      wom.updateLinks();
    };

    // Adds a new node id to the array.
    wom.addItem = function(id) {
      if (id && womHistoryArr[womHistoryArr.length - 1] !== id) {
        womHistoryArr.push(id);
        womHistoryStr = womHistoryArr.join(',');
        $.jStorage.set(womHistory, womHistoryStr);

        wom.updateLinks();
      }
    };

    // Updates all overlay links.
    wom.updateLinks = function() {
      var overlayUrl = '/overview',
      $overlayLinks = $('a[href^="' + overlayUrl + '/"], a[href="' + overlayUrl + '"]');

      if (womHistoryStr !== null) {
        overlayUrl += '/' + encodeURIComponent(womHistoryStr);
        $overlayLinks.attr('href', overlayUrl);
      }
    };

    // Flush the user's history if the defined amount if time is passed.
    if ((womNowUnix - womTimeDiff) > womLastVisitUnix) {
      wom.flushHistory();
    }

    return wom;
  };

  /**
   * Creates the current user's overview by connecting
   * media file icons in the same order as the user
   * visited them.
   */
  Drupal.behaviors.labClusterOverview = {
    attach: function (context, settings) {

      function connect(div1, div2, thickness, typeClass) {
        typeClass = typeClass || '';
        thickness = thickness || 1;

        var htmlLine, x1, x2, y1, y2, cx, cy, length, angle,
        off1 = getOffset(div1),
        off2 = getOffset(div2);

        if (off1 && off2) {
          x1 = off1.left + off1.width / 2,
          y1 = off1.top + off1.height / 2,
          x2 = off2.left + off2.width / 2,
          y2 = off2.top + off2.height / 2,
          length = Math.sqrt(((x2-x1) * (x2-x1)) + ((y2-y1) * (y2-y1))),
          cx = ((x1 + x2) / 2) - (length / 2),
          cy = ((y1 + y2) / 2) - (thickness / 2),
          angle = Math.atan2((y1-y2),(x1-x2))*(180/Math.PI);

          htmlLine = '<div class="cluster-line ' + typeClass + '" style="height:' + thickness + 'px; left:' + cx + 'px; top:' + cy + 'px; width:' + length + 'px; -moz-transform:rotate(' + angle + 'deg); -webkit-transform:rotate(' + angle + 'deg); -o-transform:rotate(' + angle + 'deg); -ms-transform:rotate(' + angle + 'deg); transform:rotate(' + angle + 'deg);"></div>';

          $clusterOverview.append(htmlLine);
        }
      }

      function getOffset(el) {
        if (el && typeof el !== "undefined") {
          var _x = 0;
          var _y = 0;
          var _w = el.offsetWidth | 0;
          var _h = el.offsetHeight | 0;

          while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop) && el.className.indexOf('view-content') === -1) {
            _x += el.offsetLeft || 0;
            _y += el.offsetTop || 0;
            el = el.offsetParent;
          }

          return {
            top : _y,
            left : _x,
            width : _w,
            height : _h
          };
        }
        else {
          return false;
        }
      }

      if (labClusterOverviewEnabled) {
        return;
      }

      labClusterOverviewEnabled = true;

      var womHistory,
      womHistoryNids,
      womHistoryLength,
      mfRelatedNids,

      $zoomInLink,
      $zoomOutLink,

      scaleRate = 1,
      windowHeight = 0,
      originalHeight = 0,

      $clusterOverview = $('.view-cluster-overview .view-content'),
      clusterOverviewWidth = $clusterOverview.width();
      clusterOverviewHeight = $clusterOverview.height();

      if ($clusterOverview.size() > 0) {
        womHistory = new Drupal.womHistory();
        womHistoryNids = Drupal.settings.womHistory || womHistory.getItems();
        womHistoryLength = womHistoryNids.length;

        for (var i = 0; i < womHistoryLength; i++) {
          $('#cluster-overview-item-' + womHistoryNids[i]).addClass('active');

          if (typeof womHistoryNids[i + 1] !== "undefined") {
            connect(
              document.getElementById('cluster-overview-item-' + womHistoryNids[i]),
              document.getElementById('cluster-overview-item-' + womHistoryNids[i + 1])
            );
          }
        }

        $clusterOverview.find('.cluster-overview-item a').hover(function() {
          var mfRelatedElementID,
          mfElementID = $(this).attr('id'),
          mfRelatedNids = $(this).attr('data-mf-related').split('+');

          if (mfRelatedNids.length > 0) {
            $(this).addClass('mf-related-highlight');
            $('.cluster-line.mf-related-line').remove();

            for (var i = 0; i < mfRelatedNids.length; i++) {
              mfRelatedElementID = 'cluster-overview-item-' + mfRelatedNids[i];
              $('#' + mfRelatedElementID).addClass('mf-related-highlight')

              connect(
                document.getElementById(mfElementID),
                document.getElementById(mfRelatedElementID),
                1,
                'mf-related-line'
              );
            }
          }
        }, function() {
          $('.mf-related-highlight').removeClass('mf-related-highlight');
          $('.cluster-line.mf-related-line').remove();
        });

        $zoomInLink = $('<a>')
        .addClass('cluster-overview-zoom-in-btn')
        .html('<span class="border"><span class="icon"><span>z</span></span></span>')
        .click(function(e) {
          $('body').removeClass('not-scrollable');

          $clusterOverview.parent().attr('style', '');
          $clusterOverview.attr('style', '');
          e.preventDefault();
        });

        $zoomOutLink = $('<a>')
        .addClass('cluster-overview-zoom-out-btn')
        .html('<span class="border"><span class="icon"><span>z</span></span></span>')
        .click(function(e) {
          $('body').addClass('not-scrollable');

          var zoomMargin = 40,
          newStyle = '',

          newClusterHeight = $(window).height() - $clusterOverview.offset().top - zoomMargin,
          newClusterWidth = clusterOverviewWidth / clusterOverviewHeight * newClusterHeight,

          scaleRate = newClusterWidth / clusterOverviewWidth;

          newStyle += 'width: ' + (clusterOverviewWidth + 10) + 'px; height: ' + clusterOverviewHeight + 'px;';
          newStyle += '-webkit-transform: scale(' + scaleRate + ');';
          newStyle += '-moz-transform: scale(' + scaleRate + ');';
          newStyle += '-ms-transform: scale(' + scaleRate + ');';
          newStyle += '-o-transform: scale(' + scaleRate + ');';
          newStyle += 'transform: scale(' + scaleRate + ');';

          $clusterOverview.attr('style', newStyle);

          $clusterOverview.parent().css({
            width : scaleRate * clusterOverviewWidth,
            height : scaleRate * clusterOverviewHeight
          });

          e.preventDefault();
        });

        $clusterOverview.parent().prepend($zoomInLink);
        $clusterOverview.parent().prepend($zoomOutLink);

        // Handle onclick events for the reset button.
        $('#wom-history-reset').not('.processed')
        .addClass('processed')
        .click(function(e) {
          womHistory.flushHistory();
          location.href = $(this).attr('href');
          e.preventDefault();
        });

        // Only display a reset button if there is actually a history.
        if (womHistoryNids.length > 0) {
          $('#wom-history-reset').removeClass('element-invisible');
        }
      }
    }
  };

})(jQuery, Drupal, this, this.document);;
/**
 * @file
 * A JavaScript file for the theme.
 *
 * @see wom.info
 */
(function($, Drupal, window, document, undefined) {
  var $pager,
  $container,
  $relatedMedia,
  $activeSlide,
  startSlide,
  mediaFilePath,
  mediaFileNewContent,

  // Stupid workaround for slider that invoke after way too often.
  slideLoading = false,
  slideAfterTriggered = '',

  maxPagerLinks = 6,
  reactionTime = 1000,
  settings = Drupal.settings,
  womHistory = new Drupal.womHistory(),

  // Determin if the hash change event should
  // react on changes. This should be switched
  // off during startup & animations.
  hashChangeActive = false,

  updateLinksPrev = function(e, slider) {
    var target = slider.currentSlide - 1;
    if (target >= 0 && target < slider.count) {
      slider.flexAnimate(target);
    }
  },

  updateLinksNext = function(e, slider) {
    var target = slider.currentSlide + 1;
    if (target >= 0 && target < slider.count) {
      slider.flexAnimate(target);
    }
  };

  // Update womhistory links on init.
  womHistory.updateLinks();

  /**
   * Check for & update/init an available flexslider.
   */
  Drupal.updateFlexslider = function(slideID) {
    var options = settings.flexslider.optionsets['default'],
    $flexSlider = $('#' + slideID).find('.flex-flexslider');

    if ($flexSlider.size() > 0) {
      options.start = function(slider) {
        var $controlThumbsLink,
        $controlThumbs = slider.find('.flex-control-nav'),
        $activeSlide = $flexSlider.find('.flex-active-slide');

        Drupal.updateFlexsliderDesc($activeSlide);
        Drupal.updateFlexsliderControls(slider, $activeSlide);

        $flexSlider.find('.flex-control-thumbs > li').removeClass('active');
        $flexSlider.find('.flex-control-thumbs img.flex-active').parent().addClass('active');

        $('.mf-cluster-vertical.active a.mf-slider-zoom-btn').not('.processed')
        .addClass('processed')
        .click(function(e) {
          e.target = this;
          updateZoomLink(e, slider);
        });

        // Move the control thumbs into a container.
        $controlThumbs.wrap('<div class="flex-control-nav-wrapper" />');
        $controlThumbsLink = $('<a href="#" class="btn flex-control-nav-btn">').html(Drupal.t('Thumbs'));
        $controlThumbsLink.appendTo(slider.find('.flex-control-nav-wrapper'));

        $controlThumbsLink.click(function(e) {
          $flexSlider.addClass('flex-thumbs-visible');
          e.preventDefault();
        });

        $flexSlider.mouseleave(function() {
          $flexSlider.removeClass('flex-thumbs-visible');
        });

        // Wrap the flexslider direction nav links with spans.
        $flexSlider.find('.flex-direction-nav a').wrapInner('<span>');

        $(window).resize(function() {
          var $activeSlide = slider.find('.flex-active-slide');
          Drupal.updateFlexsliderControls(slider, $activeSlide);
        });

        if (slider.slides.length === 1) {
          $flexSlider.find('.flex-direction-nav, .flex-control-nav-wrapper').remove();
        }
      };

      options.after = function(slider) {
        var $activeSlide = $flexSlider.find('.flex-active-slide');
        Drupal.updateFlexsliderDesc($activeSlide);
        Drupal.updateFlexsliderControls(slider, $activeSlide);

        $flexSlider.find('.flex-control-thumbs > li').removeClass('active');
        $flexSlider.find('.flex-control-thumbs img.flex-active').parent().addClass('active');
      };

      $flexSlider.flexslider(settings.flexslider.optionsets['default']);
    }
  };

  /**
   * Updates the flexslider's controls & max-height.
   */
  Drupal.updateFlexsliderControls = function(slider, $activeSlide, type) {
    var newCss = {}, imageWidth, imageHeight,
    $dirNav = slider.find('.flex-direction-nav'),
    $controlThumbs = slider.find('.flex-control-nav'),
    newWidth = 0;

    if (typeof $container !== "undefined") {
      newWidth = $container.find('article.active-slide .mf-content').width();
    }
    else {
      newWidth = slider.parent().width();
    }

    slider.computedW = slider.itemW = slider.w = newWidth;
    slider.find('.slides li').width(slider.computedW);
    slider.find('.slides').width((slider.pagingCount + 2) * slider.computedW);
    slider.setProps(slider.computedW, "setTotal");

    // Get the active image's dimensions.
    imageWidth = $activeSlide.find('img').width();
    imageHeight = $activeSlide.find('img').height();

    // Update the flex slider controls width, so they don't look that ugly.
    if (imageWidth > 0) {
      newCss = {
        'left' : '50%',
        'max-width' : imageWidth,
        'margin-left' : -1 * Math.round(imageWidth / 2)
      };

      $dirNav.css(newCss);
      $controlThumbs.css(newCss);
    }

    // Set the flexslider's height.
    if (imageHeight > 0) {
      slider.css({
        'max-height' : imageHeight,
      });
    }
  };

  /**
   * Updates a default flexslider's image description.
   */
  Drupal.updateFlexsliderDesc = function($activeSlide) {
    var newTitle, newTeaser, newDescription,
    mfCacheTitle, mfCacheTeaser, mfCacheDescription,

    $activeMf = $('article.node-media-file.active-slide'),
    $activeMfCache = $activeMf.find('.mf-desc-cache'),

    // Get the container's for the media files description.
    $activeMfTitle = $activeMf.find('.node-title'),
    $activeMfTeaser = $activeMf.find('.mf-desc .readmore'),
    $activeMfDescription = $activeMf.find('.mf-desc-full');

    // Create a cache container for the default description.
    if ($activeMfCache.size() === 0) {
      $activeMfCache = $('<div>').addClass('mf-desc-cache element-invisible');
      $activeMfCache.append($('<div>').addClass('mf-desc-cache-title').html($activeMfTitle.html()));
      $activeMfCache.append($('<div>').addClass('mf-desc-cache-teaser').html($activeMfTeaser.html()));
      $activeMfCache.append($('<div>').addClass('mf-desc-cache-description').html($activeMfDescription.html()));
      $activeMfCache.appendTo($activeMf);
    }

    mfCacheTitle = $activeMfCache.find('.mf-desc-cache-title').html();
    mfCacheTeaser = $activeMfCache.find('.mf-desc-cache-teaser').html();
    mfCacheDescription = $activeMfCache.find('.mf-desc-cache-description').html();

    newTitle = $.trim($activeSlide.find('img').attr('title'));
    if (newTitle === '') {
      newTitle = mfCacheTitle;
    }

    newTeaser = $.trim($activeSlide.find('.views-field-field-media-file-images-desc .field-content').html());
    if (newTeaser === '') {
      newTeaser = mfCacheTeaser;
    }

    newDescription = mfCacheDescription;
    newDescription += '<div class="mf-additional-desc"><hr>';

    $activeSlide.parent().find('li').not('.clone').each(function(index) {
      var $currentSlide = $(this),

      currentTitle = $.trim($currentSlide.find('img').attr('title'));
      if (currentTitle === '') {
        currentTitle += 'Image ' + (index + 1);
      }

      currentDescription = $.trim($currentSlide.find('.views-field-field-media-file-images-desc-1 .field-content').html());

      newDescription += '<h3>' + currentTitle + ':</h3>';
      newDescription += '<div>' + currentDescription + '</div>';
    });

    // Update the currently active text.
    $activeMfTitle.html(newTitle);
    $activeMfTeaser.html(newTeaser);
    $activeMfDescription.find('h3').remove();
    $activeMfDescription.find('.inner').html(newDescription);

    // Reattach overlay links.
    $activeMfTeaser.find('.processed').removeClass('processed');

    // Remove duplicate readmore buttons.
    if ($activeMf.find('.slide-overlay-btn').size() > 1) {
      $activeMfTeaser.find('.slide-overlay-btn').remove();
    }

    Drupal.behaviors.labSlideOverlay.attach();
  };

  /**
   * Make sure our own prev/next links can act as direction nav.
   * Therefore we update the links on each start & after each slide.
   */
  function updateLinks(slider) {
    slider.find('.mf-nav-prev').not('.processed')
    .addClass('processed')
    .click(function(e) {
      if ($('#mf-cluster-vertical-main').hasClass('active')) {
        updateLinksPrev(e, slider);
      }

      e.preventDefault();
    });

    slider.find('.mf-nav-next').not('.processed')
    .addClass('processed')
    .click(function(e) {
      if ($('#mf-cluster-vertical-main').hasClass('active')) {
        updateLinksNext(e, slider);
      }

      e.preventDefault();
    });
  }

  /**
   * Makes sure the slider shows the correct amount of slides.
   */
  function updatePager(slider) {
    // maxPagerLinks without first & last
    // which will always be displayed
    var maxRange = Math.floor((maxPagerLinks - 2) / 2),
    $elements = $('a.mf-cluster-nav-list-item'),
    $elementParents = $elements.parent();

    $elements.find('div:first').removeClass('active');
    $('a.mf-cluster-nav-list-item.active div:first').addClass('active');

    $pager.removeClass('first').removeClass('last');
    if (slider.currentSlide === 0) {
      $pager.addClass('first');
    }

    if (slider.currentSlide + 1 === slider.count) {
      $pager.addClass('last');
    }

    if (slider.count > maxPagerLinks) {
      $elementParents
      .removeClass('element-invisible')
      .removeClass('edge-right')
      .removeClass('edge-left');

      $elements.each(function(index) {
        var $parent = $(this).parent();
        if (index !== 0 && index !== (slider.count - 1) && Math.abs(index - slider.currentSlide) > maxRange) {
          $parent.addClass('element-invisible');
        }
        else if (index === slider.currentSlide + maxRange && index < slider.count - 2) {
          $parent.addClass('edge-right');
        }
        else if (index === slider.currentSlide - maxRange && index > 1) {
          $parent.addClass('edge-left');
        }
      });
    }
  }

  /**
   * Make sure related media get's displayed correctly.
   */
  function updateRelatedMedia(related) {
    /**
     * Handles a vertical slide by animating the whole page via css3.
     */
    function animate($activeItem, $nextItem, newContent) {
      var direction = 'top',
      oppDirection = 'bottom';

      if ($nextItem.attr('id') === 'mf-cluster-vertical-bottom'
      || ($nextItem.attr('id') === 'mf-cluster-vertical-main' &&  $activeItem.attr('id') === 'mf-cluster-vertical-top')) {
        direction = 'bottom';
        oppDirection = 'top';
      }

      $('body').addClass('mf-animation-vertical');
      $activeItem.removeClass('active').addClass(oppDirection);
      $nextItem.removeClass(direction).addClass('active');

      setTimeout(function() {
        $('body').removeClass('mf-animation-vertical');
        $('body').addClass('mf-animation-complete');

        $('#content').html(newContent);

        mediaFileInitSlider();
        updateRelatedMedia();
        Drupal.attachBehaviors();

        hashChangeActive = true;
      }, animDelay);
    }

    var $body = $('body'),
    animDelay = 2000,
    relatedBackLink = '',
    relatedBackLinkClass = '',
    $activeSlide = $('.mf-cluster-vertical.active article.active-slide');

    related = related || false;
    if (!$('#mf-cluster-vertical-main').hasClass('active')) {
      $relatedMedia = $('.mf-cluster-vertical.active .mf-related-media');
    }

    // Apply the related media's content to the page.
    $relatedMedia.html($activeSlide.find('.mf-related-media-cache').html());

    $relatedMedia.find('a').not('.processed')
    .addClass('processed')
    .click(function(e) {
      var $nextItem,
      $link = $(this),
      $parent = $link.parent(),
      $activeItem = $('.mf-cluster-vertical.active'),
      wrapperID = '#mf-cluster-vertical-main',

      relatedPath = $link.attr('href');

      hashChangeActive = false;
      mediaFilePath = relatedPath;
      $.bbq.pushState({
        path : relatedPath.replace(Drupal.settings.basePath, '')
      });

      if ($activeItem.attr('id') === 'mf-cluster-vertical-main') {
        if ($parent.hasClass('views-row-first')) {
          $nextItem = $('#mf-cluster-vertical-top');
        }
        else {
          $nextItem = $('#mf-cluster-vertical-bottom');
        }
      }
      else {
        $nextItem = $('#mf-cluster-vertical-main');
      }

      $('body').removeClass('mf-animation-complete');
      if ($nextItem.hasClass('loaded')) {
        animate($activeItem, $nextItem);
      }
      else {
        // Node's will generate the corresponding related media links automatically.
        relatedPath += '?position=' + encodeURIComponent($nextItem.attr('id'));
        relatedPath += '&related=' + encodeURIComponent($activeSlide.attr('data-path'));
        relatedPath += '&title=' + encodeURIComponent($activeSlide.attr('data-title'));
        relatedPath += '&cluster=' + encodeURIComponent($.trim($activeItem.find('h2:first').text()));

        $.get(relatedPath, function(data) {
          var newContent = $(data).find('#content').html();
          animate($activeItem, $nextItem, newContent);
        });
      }

      e.preventDefault();
    });

    // Add classes for related media line display.
    $body.removeClass('mf-related-media-top').removeClass('mf-related-media-bottom');
    if ($('.mf-related-media .views-row-first').size() > 0) {
      $body.addClass('mf-related-media-top');
    }
    if ($('.mf-related-media .views-row-last').not('.views-row-first').size() > 0) {
      $body.addClass('mf-related-media-bottom');
    }
  }

  /**
   * Checks if a zoomLink is available & updates it's content/behavior.
   */
  function updateZoomLink(e) {
    var options, $closeLink,

    $element = $(e.target),
    sliderID = $element.attr('href'),

    $overlay = $(sliderID),
    $zoomSlider = $overlay.find('.zoom-flexslider'),
    zoomSliderIndex = 0,

    $parentSlider = $('#' + $overlay.attr('data-node')).parent().find('.flex-flexslider'),
    parentSliderIndex = $parentSlider.data('flexslider').currentSlide;

    if (!$overlay.hasClass('processed')) {
      options = settings.flexslider.optionsets['zoomed'];
      options.startAt = parentSliderIndex;

      options.start = function(slider) {
        $zoomSlider.find('.zoom-control-thumbs > li').removeClass('active');
        $zoomSlider.find('.zoom-control-thumbs img.zoom-active').parent().addClass('active');

        $zoomSlider.find('.zoom-direction-nav a').each(function() {
          $(this).html('<span>' + $(this).text() + '</span>');
        });

        updateZoomSliderHeight(slider);
        $(window).resize(function() {
          updateZoomSliderHeight(slider);
        });
      };

      options.after = function(slider) {
        $zoomSlider.find('.zoom-control-thumbs > li').removeClass('active');
        $zoomSlider.find('.zoom-control-thumbs img.zoom-active').parent().addClass('active');
      };

      $overlay.addClass('processed').appendTo($('body'));

      $closeLink = $('<a>').addClass('mf-slider-zoom-close');
      $closeLink.attr('href', sliderID);
      $closeLink.html(Drupal.t('close'));
      $closeLink.click(updateZoomLink);

      // Now actually load all the images that are in the slider.
      $zoomSlider.find('img').each(function() {
        $(this).attr('src', $(this).attr('data-src'));
      });

      $zoomSlider.append($closeLink);
      $zoomSlider.flexslider(options);
    }

    if (!$overlay.hasClass('active')) {
      $zoomSlider.data('flexslider').flexAnimate(parentSliderIndex);
      $overlay.addClass('active');
    }
    else {
      zoomSliderIndex = $zoomSlider.data('flexslider').currentSlide;
      $parentSlider.data('flexslider').flexAnimate(zoomSliderIndex);
      $overlay.removeClass('active');
    }

    e.preventDefault();
  }

  /**
   * Updates the zoomslider's viewport depending on the current windowheight.
   */
  function updateZoomSliderHeight(slider) {
    var windowHeight = $(window).height(),
    zoomViewportOffset = slider.find('.zoom-viewport').offset().top,
    zoomControlsHeight = slider.find('.zoom-control-thumbs').height();
    slider.find('.zoom-viewport, .zoom-direction-nav').css({
      'max-height' : windowHeight - zoomViewportOffset - zoomControlsHeight - 2
    });
  }

  /**
   * Updates the window title, depending on the currently
   * viewed media file.
   */
  function updateTitle($activeSlide) {
    var divider = '|',
    title = document.title,
    titleArr = title.split(divider),
    mediaFileTitle = $activeSlide.find('.node-title:first').text();

    titleArr[0] = mediaFileTitle + ' ';
    title = titleArr.join(divider);

    document.title = title;
  }

  /**
   * Loads & initializes the current slide.
   */
  function updateCurrentSlide(slider, $activeSlide) {
    var currentNID,
    slideID = $activeSlide.attr('id'),
    slidePath = $activeSlide.attr('data-path');

    currentNID = $activeSlide.attr('id').split('-')[1];
    womHistory.addItem(currentNID);

    // Add a hash parameter to make this content linkeable.
    mediaFilePath = slidePath;
    slidePath = slidePath.replace(Drupal.settings.basePath, '');

    $.bbq.pushState({path : encodeURIComponent(slidePath)});

    // If the next slide is empty, we will have to load it's contents.
    if ($activeSlide.hasClass('empty') && !slideLoading) {
      slideLoading = true;

      $.get(slidePath, function(data) {
        slideLoading = false;

        var newContent = $(data).find('#' + slideID).html();
        $('#' + slideID).html(newContent);

        Drupal.attachBehaviors();
        Drupal.updateFlexslider(slideID);
        updateRelatedMedia();
        updateLinks(slider);
        updateTitle($activeSlide);

        $activeSlide.removeClass('empty');
        $activeSlide.addClass('initialized');

        // Tell the body we are done with animating.
        // But wait for the reaction time to finish.
        setTimeout(function() {
          $('body').addClass('mf-animation-complete');
        }, reactionTime);

        $(window).resize();
      });
    }

    else if (!$activeSlide.hasClass('empty')) {
      if (!$activeSlide.hasClass('initialized')) {
        $activeSlide.addClass('initialized');

        Drupal.updateFlexslider($activeSlide.attr('id'));
        updateLinks(slider);
        updateTitle($activeSlide);
      }

      updateRelatedMedia();

      // Tell the body we are done with animating.
      // But wait for the reaction time to finish.
      $('body').addClass('mf-animation-complete');

      $(window).resize();
    }

    updatePager(slider);
  }

  /**
   * Initializes the slider for a given media cluster.
   */
  function mediaFileInitSlider() {
    $pager = $('.mf-cluster-pager');
    $container = $('.mf-cluster-wrapper').not('.related .mf-cluster-wrapper');
    $relatedMedia = $('.mf-cluster-vertical.active .mf-related-media');

    $activeSlide = $container.find('article').not('.empty');
    startSlide = parseInt($activeSlide.attr('data-index'), 10);

    // If this page is loaded with an active mediafile ID,
    // change the startSlide to the mediafile's one.
    mediaFilePath = $.bbq.getState('path');
    if (mediaFilePath) {
      mediaFilePath = Drupal.settings.basePath + decodeURIComponent(mediaFilePath);

      $activeSlide = $container.find('article[data-path="' + mediaFilePath + '"]');
      startSlide = parseInt($activeSlide.attr('data-index'), 10);
    }

    // Initialize the main flexslider.
    $container.find('article').width($(window).width());
    $container.flexslider({
      namespace : '',
      selector : '.mf-cluster-items article',
      animation : 'slide',
      startAt : startSlide,
      slideshow : false,
      directionNav : false,
      animationLoop : false,
      keyboard : false,
      useCSS : false,
      manualControls : '.mf-cluster-pager .mf-cluster-nav-list a',

      start : function(slider) {
        $activeSlide = slider.find('article').not('.empty');
        updateCurrentSlide(slider, $activeSlide);
        hashChangeActive = true;

        $('.mf-cluster-nav-prev').click(function(e) {
          updateLinksPrev(e, slider);
        });

        $('.mf-cluster-nav-next').click(function(e) {
          updateLinksNext(e, slider);
        });

        // Add a keyboard navigation to the whole media file slider.
        $(window).unbind();
        $(window).keyup(function(e) {
          var addition,
          imageSlider,
          imageSliderTarget,
          imageSliderActive = false,
          $activeSlide, $flexSlider;

          if (e.which === 37 || e.which === 39) {
            switch (e.which) {
              case 37: // Left Arrow
                addition =  -1;
                break;

              case 39: // Right Arrow
                addition = 1;
                break;
            }

            $activeSlide = $container.find('article[data-index="' + slider.currentSlide + '"]');

            $flexSlider = $activeSlide.find('.flex-flexslider');
            if ($flexSlider.size() > 0) {
              imageSlider = $flexSlider.data('flexslider');

              if (imageSlider.currentSlide + addition >= 0 && imageSlider.currentSlide + addition < imageSlider.count) {
                imageSlider.flexAnimate(imageSlider.currentSlide + addition);
                imageSliderActive = true;
              }
            }

            if (slider.currentSlide + addition >= 0 && slider.currentSlide + addition < imageSlider.count && !imageSliderActive) {
              slider.flexAnimate(slider.currentSlide + addition);
            }

            e.preventDefault();
          }
        })

        // Bind a callback that executes when document.location.hash changes.
        .bind('hashchange', function(e) {
          if (hashChangeActive === true) {
            mediaFilePath = $.bbq.getState('path');
            if (mediaFilePath) {
              mediaFilePath = Drupal.settings.basePath + decodeURIComponent(mediaFilePath);
              $('.mf-cluster-nav-list-item[href="' + mediaFilePath + '"]').trigger('click');
            }
          }
        })

        // Resize the next & prev buttons on window resize.
        .bind('resize', function() {
          var contentWidth,
          windowWidth = $(window).width(),
          windowHeight = $(window).height();

          slider.computedW = windowWidth;
          slider.slides.width(slider.computedW);
          slider.find('.mf-cluster-items').width(slider.pagingCount * slider.computedW);
          slider.setProps(slider.computedW, "setTotal");

          contentWidth = $('.mf-content:first').width();
          $('.mf-nav-next, .mf-nav-prev').css({
            width : Math.floor((windowWidth - contentWidth) / 2)
          });
        });

        // Trigger resize to init scaling.
        $(window).resize();
      },

      before : function(slider) {
        // Stop all videos that might be playing by resetting the iframe's src.
        var $oldSlide = $container.find('article[data-index="' + slider.currentSlide + '"]'),
        $iFrame = $oldSlide.find('iframe');
        if ($iFrame.size() > 0) {
          $iFrame.attr('src', $iFrame.attr('src'));
        }

        $('body')
        .removeClass('mf-animation-complete')
        .removeClass('mf-related-media-top')
        .removeClass('mf-related-media-bottom');

        hashChangeActive = false;
      },

      after : function(slider) {
        if (slider.currentSlide !== slideAfterTriggered) {
          slideAfterTriggered = slider.currentSlide;
          hashChangeActive = true;

          updateCurrentSlide(slider, slider.find('article.active-slide'));
          updateRelatedMedia();

          // Trigger resize to init scaling.
          $(window).resize();
        }
      }
    });
  }

  $(document).ready(function() {
    // These behaviors should only be applied on media file pages.
    if (!$('body').hasClass('node-type-media-file')) {
      return false;
    }

    mediaFileInitSlider();
  });
})(jQuery, Drupal, this, this.document);
;
/**
 * @file
 * A JavaScript file for the theme.
 *
 * @see wom.info
 */
(function($, Drupal, window, document, undefined) {
  var queryElems = [],
  keywordsArr = [],
  keywordsTidsArr = [],
  keywordsMax = 50,
  keyWordsMaxDefault = 50,
  $keywordInput,
  $categorySelect,
  $viewClusters,
  $viewKeywords,
  $viewCategories,

  queryTitle = Drupal.t('You selected.'),
  btnClearSearch = Drupal.t('Clear search'),
  btnResetSearch = Drupal.t('Show results'),
  defaultHead = Drupal.t('How this material is organized'),
  defaultFoot = Drupal.t('No words selected.'),

  defaultHeadTooltip = '<a class="link-info-icon"><span><span class="icon icon-info"></span></span></a>';
  defaultHeadTooltip += '<div class="tooltip">';
  //defaultHeadTooltip += '  <h3 class="title">How this material is organized</h3>';
  defaultHeadTooltip += '  <div class="content"><p>This site is organized by way of clusters, which comprise images, videos, and texts from individual research endeavors. These media clusters are interlinked, sometimes thematically, other times theoretically or geographically. Another way to navigate this material is via keywords, which cut across clusters, bringing new connections or frictions into view.</p></div>';
  defaultHeadTooltip += '</div>';

  /**
   * Updates the display of the primary keywords view.
   * The number of displayed items is limited by keywordsMax.
   *
   * @param filter (optional)
   *   Term ID
   */
  function womUpdateKeywords(filter) {
    var andMoreText, $all, $shown, $hidden;

    filter = filter || '*';
    if (filter !== '*') {
      filter = '.tid-' + filter;
    }

    $viewKeywords.find('.search-and-more').remove();

    $shown = $viewKeywords.find('.view-content > ' + filter).not('.selected');
    $shown.removeClass('element-invisible');

    $hidden = $viewKeywords.find('.view-content > *').not(filter + ', .selected');
    $hidden.addClass('element-invisible');

    // Only show the defined number of items.
    if ($shown.size() > keywordsMax) {
      $shown.each(function(index) {
        if ((index + 1) > keywordsMax) {
          $(this).addClass('element-invisible');
        }
      });

      andMoreText = Drupal.t('and !number more', {
        '!number' : ($shown.size() - keywordsMax)
      });

      $('<a>').addClass('btn search-and-more')
      .html(andMoreText)
      .click(function(e) {
        keywordsMax = 1000000;
        womUpdateKeywords($categorySelect.val());
        e.preventDefault();
      })
      .appendTo($viewKeywords.find('.view-content'));
    }
  }

  /**
   * Creates the select element for filtering the main keywords view.
   */
  function womInitKeywords() {
    // Store the initial state of the keywords container
    // in a variable. We will use this in later processes.
    defaultKeywords = $.trim($viewKeywords.find('.view-content').html());

    $categorySelect = $('<select>').attr('id', 'search-category-select');
    $('<option>').attr('value', '*')
      .html(Drupal.t('Choose a category'))
      .appendTo($categorySelect);

    $viewCategories.find('a.tid').each(function() {
      var $this = $(this);
      $('<option>').attr('value', $this.attr('data-filter'))
        .html($this.text())
        .appendTo($categorySelect);
    });

    $viewCategories.find('.view-content').hide();
    $('<div>').addClass('search-category-select-wrapper').append($categorySelect)
      .prependTo($viewCategories);

    $categorySelect
    .on('chosen:showing_dropdown', function(e, params) {
      setTimeout(function() {
        var $chosenLinks = $(params.chosen.search_results).find('li');
        $viewCategories.find('.view-content .tooltip').each(function(i) {
          $(this).clone().appendTo($chosenLinks.get(i + 1));
        });

        $chosenLinks.hover(function() {
          var $tooltip = $(this).find('.tooltip'),
          $clone = $tooltip.clone().addClass('clone fixed');

          $clone.css({
            opacity : 1,
            width : $tooltip.width(),
            height : $tooltip.height(),
            top : $tooltip.offset().top,
            left : $tooltip.offset().left
          });

          $('body').append($clone);
        }, function() {
          $('.tooltip.clone').remove();
        });

        Drupal.behaviors.labTooltips.attach();
      }, 0);
    })
    .chosen({
      disable_search_threshold : 1000,
      allow_single_deselect : true,
      placeholder_text_single : Drupal.t('Choose a category')
    });

    $categorySelect.change(function() {
      keywordsMax = keyWordsMaxDefault;
      womUpdateKeywords($(this).val());
    }).trigger('change');
  }

  /**
   * Creates the autocomplete textfield and adds all events.
   */
  function womInitAutocomplete() {
    keywordsArr = [];
    keywordsTidsArr = [];

    $keywordInput = $('<input>').attr({
      'id' : 'search-keyword-input',
      'type' : 'text'
    });

    $('<div>').append($keywordInput).prependTo($viewCategories);

    $viewKeywords.find('.tid').each(function() {
      keywordsArr.push($(this).html());
      keywordsTidsArr.push({
        tid : $(this).attr('data-filter'),
        name : $(this).html()
      })
    });

    $keywordInput.typeahead({
      // We will have to create a unique name each time
      // otherwise we won't be able to update the keywords
      // in the autocomplete field:
      // https://github.com/twitter/typeahead.js/issues/41
      name : 'keywords' + new Date().getTime(),
      local : keywordsArr
    });

    $keywordInput.on('typeahead:selected', function(e) {
      var termID = womGetKeywordIDByName($(this).val());
      if (termID) {
        womQueryAdd(termID, $(this).val(), 'keyword');
      }
    });

    $keywordInput.keyup(function() {
      var fragment = $(this).val();
      $('.tt-suggestion p').each(function() {
        var str = $(this).html();
        str = str.split(fragment).join('<span class="highlight">' + fragment + '</span>');

        $(this).html(str);
      });
    });

    $keywordInput.after('<span class="search-icon"></span>');
  }

  /**
   * Creates all necessary containers for query processing.
   * Also adds events used to add or remove query elements.
   */
  function womQueryInit() {
    var $wrapper = $('article.node-460');

    // Create the search header.
    $wrapper.prepend(
      $('<div>').attr('id', 'search-header').addClass('slide-overlay-to-head')
      .append($('<div>').attr('id', 'search-query-empty')
        .append($('<h3>').html(defaultHead))
        .append($('<div class="search-header-info">').html(defaultHeadTooltip))
      )
      .append($('<div>').attr('id', 'search-query-display')
        .append($('<h3>').html(queryTitle))
      )
    );

    // Create the search footer.
    $wrapper.append(
      $('<div>').attr('id', 'search-footer').addClass('slide-overlay-to-foot')
      .append($('<div>').attr('id', 'search-footer-summary')
        .append($('<h2>').html(defaultFoot))
      )
      .append($('<div>').attr('id', 'search-footer-buttons')
        .append($('<a>').attr('id', 'search-btn-clear-search')
          .addClass('btn disabled')
          .html(btnClearSearch)
        )
        .append($('<a>').attr('id', 'search-btn-show-results')
          .addClass('btn disabled')
          .html(btnResetSearch)
        )
      )
    );

    // Add search footer btn event handlers.
    $('#search-btn-clear-search').click(function(e) {
      if (!$(this).hasClass('disabled')) {
        womQueryReset();
      }
      e.preventDefault();
    });

    $('#search-btn-show-results').click(function(e) {
      if (!$(this).hasClass('disabled')) {
        womQuerySubmit();
      }
      e.preventDefault();
    });

    $viewClusters.find('a.btn').click(function(e) {
      if ($(this).attr('data-filter')) {
        womQueryAdd($(this).attr('data-filter'), $(this).text(), 'cluster');
      }

      e.preventDefault();
    });

    $viewKeywords.find('a.btn').click(function(e) {
      if ($(this).attr('data-filter')) {
        womQueryAdd($(this).attr('data-filter'), $(this).text(), 'keyword');
      }

      e.preventDefault();
    });

    // Manually run the tooltip behavior.
    Drupal.behaviors.labTooltips.attach();
    womQueryUpdate();
  }

  /**
   * Updates the display of the currently selected query.
   * Also does the ajax request to update the results preview.
   */
  function womQueryUpdate(noQuery) {
    var queryUrl, $queryElem,
    querySize = queryElems.length;

    // This flag ca be used to determin if we need to do a query.
    noQuery = noQuery || false;

    if (querySize > 0) {
      $('#search-header, #search-footer').addClass('selected');
    }
    else {
      $('#search-header, #search-footer').removeClass('selected');
    }

    $('#search-query-display a, .simple-tooltip, #search-query-display .clear').remove();
    $viewClusters.find('a.btn').removeClass('selected');
    $viewKeywords.find('a.btn').removeClass('selected');

    $.each(queryElems, function(key, element) {
      $queryElem = $('<a>').attr({
        'id' : 'search-query-' + element.id,
        'data-filter' : element.id,
        'title' : Drupal.t('Remove this keyword by clicking on it.')
      });

      $queryElem.addClass('btn simple-tt ' + element.type);
      $queryElem.html(element.name);

      $('#search-query-display').append($queryElem);
      $('#term-btn-' + element.id).addClass('selected');
    });

    // Made sure search query get's cleared.
    $('#search-query-display').append('<div class="clear"></div>');

    $('#search-query-display a').click(function(e) {
      womQueryRemove($(this).attr('data-filter'));
      e.preventDefault();
    });

    // Get a summary of this query's results.
    // An ajax request will be used for this.
    if (!noQuery) {
      if (queryElems.length > 0) {
        queryUrl = womQuerySubmit(true);

        $('#search-btn-clear-search, #search-btn-show-results').removeClass('disabled');
        $('#search-footer-summary').addClass('loading').html('');

        $.get(queryUrl, function(data) {
          $('#search-footer-summary').html(data)
            .removeClass('loading');

          womProcessQuery();
        });
      }
      else {
        $('#search-btn-clear-search, #search-btn-show-results').addClass('disabled');
        $('#search-footer-summary').removeClass('loading').html('<h2>' + defaultFoot + '</h2>');

        womProcessQuery(true);
      }
    }

    // Adjust slide-body & slide-header height.
    var paddingTop = 120;
    paddingTop += $('#search-query-display').height();
    $('.slide-overlay-body').css('padding-top', paddingTop);

    womUpdateKeywords($categorySelect.val());
    Drupal.behaviors.womSimpleTooltips.attach();
  }

  /**
   * Adds a new element to the query.
   */
  function womQueryAdd(id, name, type) {
    if ($('#search-query-' + id).size() === 0) {
      queryElems.push({
        id : id,
        name : name,
        type : type
      });

      womQueryUpdate();
    }
  }

  /**
   * Removes an element from the query, defined by an id.
   */
  function womQueryRemove(id) {
    var newQuery = [];
    for (var i in queryElems) {
      if (queryElems.hasOwnProperty(i)) {
        if (queryElems[i].id !== id) {
          newQuery.push(queryElems[i]);
        }
      }
    }

    queryElems = newQuery;
    womQueryUpdate();
  }

  /**
   * Removes all elements from the query.
   */
  function womQueryReset() {
    queryElems = [];
    womQueryUpdate();
  }

  /**
   * Generates a new query url from the user's selection.
   * If param is set to true, the url is just returned.
   * Otherwise the user will be redirected.
   */
  function womQuerySubmit(forAjax) {
    forAjax = forAjax || false;

    var queryUrl,
    queryUrlElements = {
      'keyword' : [],
      'cluster' : []
    };

    $.each(queryElems, function(key, element) {
      queryUrlElements[element.type].push(element.id);
    });

    queryUrl = Drupal.settings.basePath;
    queryUrl += 'search/results';
    queryUrl += '/' + ((queryUrlElements.keyword.length > 0) ? queryUrlElements.keyword.join(',') : 'all');
    queryUrl += '/' + ((queryUrlElements.cluster.length > 0) ? queryUrlElements.cluster.join('+') : 'all');

    if (forAjax) {
      queryUrl += '/summary';
      return queryUrl;
    }
    else {
      location.href = queryUrl;
    }
  }

  /**
   * Processes the results of an ajax query.
   * Primarily used to update the keywords view.
   */
  function womProcessQuery(reset) {
    var $keywordReplacement = $('#wom-search-keyword-replacement'),
    newKeywords = $.trim($keywordReplacement.html());

    reset = reset || false;
    if (reset) {
      newKeywords = defaultKeywords;
    }

    // Remove the keywords replacement container
    // to avoid double use of ids.
    $keywordReplacement.remove();

    // Replace the displayed keywords with the one's we extracted.
    $viewKeywords.find('.view-content').html(newKeywords);
    $viewKeywords.find('.btn.search-and-more').remove();

    // Update the view to restore all hidden keywords.
    womQueryUpdate(true);

    // Readd click events.
    $viewKeywords.find('a.btn').click(function(e) {
      if ($(this).attr('data-filter')) {
        womQueryAdd($(this).attr('data-filter'), $(this).text(), 'keyword');
      }

      e.preventDefault();
    });

    // Recreate the autocomplete input field.
    $('.twitter-typeahead').parent().remove();
    $keywordInput.typeahead('destroy');
    $keywordInput.unbind();

    womInitAutocomplete();
  }

  /**
   * Find a keyword's term id by name.
   */
  function womGetKeywordIDByName(name) {
    var tid = false;
    $.each(keywordsTidsArr, function(key, value) {
      if (value.name === name) {
        tid = value.tid;
        return false;
      }
    });

    return tid;
  }

  /**
   * Initializes the keyword search functionality.
   */
  Drupal.behaviors.womKeywordSearch = {
    attach: function (context, settings) {
      $viewClusters = $('.view-id-search_filter_cluster');
      if ($viewClusters.size() > 0 && !$viewClusters.hasClass('processed')) {
        $viewClusters.addClass('processed');

        $viewKeywords = $('.view-id-search_filter.view-display-id-block_1');
        $viewCategories = $('.view-id-search_filter.view-display-id-block');

        // Create the category select of the fallback links.
        womInitKeywords();

        // Create the autocomplete textfield.
        womInitAutocomplete();

        // Creates all necessary containers for query processing.
        womQueryInit();
      }
    }
  }

})(jQuery, Drupal, this, this.document);;
/*
 * We are overriding a large part of the JS defined in leaflet (leaflet.drupal.js).
 * Not nice, but we can't do otherwise without refactoring code in Leaflet.
 */

(function ($) {

  Drupal.behaviors.leaflet = { // overrides same behavior in leaflet/leaflet.drupal.js
    attach: function(context, settings) {
      $(settings.leaflet).each(function () {
        // bail if the map already exists
        var container = L.DomUtil.get(this.mapId);
        if (!container) {
          return false;
        }
        else if (container._leaflet) {
          return false;
        }

        // load a settings object with all of our map and markercluster settings
        var settings = {};
        for (var setting in this.map.settings) {
          settings[setting] = this.map.settings[setting];
        }

        // instantiate our new map
        var lMap = new L.Map(this.mapId, settings);

        // dont't pan outside the world
        lMap.on('moveend', function(evt) {
          var latitude = this.getCenter().lat;
          var longitude = this.getCenter().lng;

          if (latitude > 80) {
            this.panTo({lat: 60, lng: longitude});
          }
          if (latitude < -80) {
            this.panTo({lat: -60, lng: longitude});
          }
          /*if (longitude > 160) {
            this.panTo({lat: latitude, lng: 140});
          }
          if (longitude < -160) {
            this.panTo({lat: latitude, lng: -140});
          }*/
        });

        lMap.on('click', function(e) {
          $('img.marker-active').removeClass('marker-active');
        });

        lMap.on('popupopen', function() {
          $('.popup-close').click(function(e) {
            lMap.closePopup();
            $('img.marker-active').removeClass('marker-active');
            e.stopImmediatePropagation();
          });
        });

        // add map layers
        var layers = {}, overlays = {};
        var i = 0;
        for (var key in this.map.layers) {
          var layer = this.map.layers[key];
          var map_layer = Drupal.leaflet.create_layer(layer, key);

          layers[key] = map_layer;

          // add the layer to the map
          if (i >= 0) {
            lMap.addLayer(map_layer);
          }
          i++;
        }

        // @RdB create a marker cluster layer if leaflet.markercluster.js is included
        var cluster_layer = null;
        if (typeof L.MarkerClusterGroup != 'undefined') {

          // If we specified a custom cluster icon, use that.
          if (this.map.markercluster_icon) {
            var icon_settings = this.map.markercluster_icon;

            settings['iconCreateFunction'] = function(cluster) {
              var icon = new L.Icon({iconUrl: icon_settings.iconUrl});

              // override applicable marker defaults
              if (icon_settings.iconSize) {
                icon.options.iconSize = new L.Point(parseInt(icon_settings.iconSize.x), parseInt(icon_settings.iconSize.y));
              }

              if (icon_settings.iconAnchor) {
                icon.options.iconAnchor = new L.Point(parseFloat(icon_settings.iconAnchor.x), parseFloat(icon_settings.iconAnchor.y));
              }

              if (icon_settings.popupAnchor) {
                icon.options.popupAnchor = new L.Point(parseFloat(icon_settings.popupAnchor.x), parseFloat(icon_settings.popupAnchor.y));
              }

              if (icon_settings.shadowUrl !== undefined) {
                icon.options.shadowUrl = icon_settings.shadowUrl;
              }

              if (icon_settings.shadowSize) {
                icon.options.shadowSize = new L.Point(parseInt(icon_settings.shadowSize.x), parseInt(icon_settings.shadowSize.y));
              }

              if (icon_settings.shadowAnchor) {
                icon.options.shadowAnchor = new L.Point(parseInt(icon_settings.shadowAnchor.x), parseInt(icon_settings.shadowAnchor.y));
              }

              return icon;
            }
          }

          // Note: only applicable settings will be used, remainder are ignored
          cluster_layer = new L.MarkerClusterGroup(settings);
          lMap.addLayer(cluster_layer);

          // Handle onclick events for marker clusters.
          cluster_layer.on('clusterclick', function (e) {
            $('div.marker-cluster').removeClass('active');
            $(e.originalEvent.target).addClass('active');
          });
        }

        // add features
        for (i = 0; i < this.features.length; i++) {
          var feature = this.features[i];
          var lFeature;

          // dealing with a layer group
          if (feature.group) {
            var lGroup = new L.LayerGroup();
            for (var groupKey in feature.features) {
              var groupFeature = feature.features[groupKey];
              lFeature = leaflet_create_feature(groupFeature);
              if (groupFeature.popup) {
                lFeature.bindPopup(groupFeature.popup);
              }
              lGroup.addLayer(lFeature);
            }

            // add the group to the layer switcher
            overlays[feature.label] = lGroup;

            if (cluster_layer) {
              cluster_layer.addLayer(lGroup);
            } else {
              lMap.addLayer(lGroup);
            }
          }
          else {
            lFeature = leaflet_create_feature(feature);
            // @RdB add to cluster layer if one is defined, else to map
            if (cluster_layer) {
              cluster_layer.addLayer(lFeature);
            }
            else {
              lMap.addLayer(lFeature);
            }
            if (feature.popup) {
              var popupHtml = '<div><span class="popup-close">x</span>' + feature.popup + '</div>';
              lFeature.bindPopup(popupHtml, {autoPanPadding: L.point(25,25), autoPan: true});
            }
          }
        }

        // add layer switcher
        if (this.map.settings.layerControl) {
          lMap.addControl(new L.Control.Layers(layers, overlays));
        }

        // center the map
        if (this.map.center) {
          lMap.setView(new L.LatLng(this.map.center.lat, this.map.center.lon), this.map.settings.zoom);
        }
        // if we have provided a zoom level, then use it after fitting bounds
        else if (this.map.settings.zoom) {
          Drupal.leaflet.fitbounds(lMap);
          lMap.setZoom(this.map.settings.zoom);
        }
        // fit to bounds
        else {
          Drupal.leaflet.fitbounds(lMap);
        }

        // add attribution
        if (this.map.settings.attributionControl && this.map.attribution) {
          lMap.attributionControl.setPrefix(this.map.attribution.prefix);
          lMap.attributionControl.addAttribution(this.map.attribution.text);
        }

        // add the leaflet map to our settings object to make it accessible
        this.lMap = lMap;
        // Destroy features so that an AJAX reload does not get parts of the old set.
        // Required when the View has "Use AJAX" set to Yes.
        this.features = null;
      });

      function leaflet_create_feature(feature) {
        var lFeature;
        switch (feature.type) {
          case 'point':
            lFeature = Drupal.leaflet.create_point(feature);
            break;

          case 'linestring':
            lFeature = Drupal.leaflet.create_linestring(feature);
            break;

          case 'polygon':
            lFeature = Drupal.leaflet.create_polygon(feature);
            break;

          case 'multipolygon':
          case 'multipolyline':
            lFeature = Drupal.leaflet.create_multipoly(feature);
            break;

          case 'json':
            lFeature = Drupal.leaflet.create_json(feature.json)
            break;
        }

        // assign our given unique ID, useful for associating nodes
        if (feature.leaflet_id) {
          lFeature._leaflet_id = feature.leaflet_id;
        }

        lFeature.on('click', function(evt) {
          // remove active markers class first
          $('img.marker-active').removeClass('marker-active');
          evt.target.openPopup();

          // add class to active marker
          e = evt.target._icon;
          $(e).addClass("marker-active");

          // Handle click events for popup containers.
          $('.leaflet-popup-content-wrapper').unbind('click');
          $('.leaflet-popup-content-wrapper').click(function(e) {
            var $link = $('<div>').html(feature.label);
            location.href = $link.find('a').attr('href');
            e.preventDefault();
          });
        });

        var options = {};
        if (feature.options) {
          for (var option in feature.options) {
            options[option] = feature.options[option];
          }

          lFeature.setStyle(options);
        }

        return lFeature;
      }
    }
  }

})(jQuery);
;
