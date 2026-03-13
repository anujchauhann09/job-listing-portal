import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useKeyboardNavigation } from '@/hooks/useAccessibility';

interface KeyboardNavigableProps {
  children: React.ReactNode;
  items: any[];
  onSelect?: (index: number, item: any) => void;
  onEscape?: () => void;
  orientation?: 'horizontal' | 'vertical';
  loop?: boolean;
  className?: string;
  role?: 'menu' | 'listbox' | 'tablist' | 'radiogroup';
  activeIndex?: number;
  onActiveIndexChange?: (index: number) => void;
}

interface NavigableItemProps {
  children: React.ReactNode;
  index: number;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
  role?: 'menuitem' | 'option' | 'tab' | 'radio';
  disabled?: boolean;
}

const KeyboardNavigable: React.FC<KeyboardNavigableProps> = ({
  children,
  items,
  onSelect,
  onEscape,
  orientation = 'vertical',
  loop = true,
  className,
  role = 'menu',
  activeIndex: controlledActiveIndex,
  onActiveIndexChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isControlled = controlledActiveIndex !== undefined;
  
  const { 
    activeIndex: internalActiveIndex, 
    setActiveIndex, 
    handleKeyDown 
  } = useKeyboardNavigation(items, {
    onSelect,
    onEscape,
    orientation,
    loop,
  });

  const activeIndex = isControlled ? controlledActiveIndex : internalActiveIndex;

  useEffect(() => {
    if (!isControlled && onActiveIndexChange) {
      onActiveIndexChange(internalActiveIndex);
    }
  }, [internalActiveIndex, onActiveIndexChange, isControlled]);

  useEffect(() => {
    if (isControlled) {
      setActiveIndex(controlledActiveIndex);
    }
  }, [controlledActiveIndex, setActiveIndex, isControlled]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const roleProps = {
    menu: { role: 'menu' },
    listbox: { role: 'listbox', 'aria-activedescendant': activeIndex >= 0 ? `item-${activeIndex}` : undefined },
    tablist: { role: 'tablist' },
    radiogroup: { role: 'radiogroup' },
  };

  return (
    <div
      ref={containerRef}
      className={cn('focus:outline-none', className)}
      tabIndex={0}
      {...roleProps[role]}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            index,
            isActive: index === activeIndex,
            onClick: () => {
              setActiveIndex(index);
              onSelect?.(index, items[index]);
              (child.props as any).onClick?.();
            },
          });
        }
        return child;
      })}
    </div>
  );
};

const NavigableItem: React.FC<NavigableItemProps> = ({
  children,
  index,
  isActive = false,
  onClick,
  className,
  role = 'menuitem',
  disabled = false,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && itemRef.current) {
      itemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [isActive]);

  const handleClick = () => {
    if (!disabled) {
      onClick?.();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
      e.preventDefault();
      onClick?.();
    }
  };

  const roleProps = {
    menuitem: { role: 'menuitem' },
    option: { 
      role: 'option', 
      'aria-selected': isActive,
      id: `item-${index}`,
    },
    tab: { 
      role: 'tab',
      'aria-selected': isActive,
      tabIndex: isActive ? 0 : -1,
    },
    radio: { 
      role: 'radio',
      'aria-checked': isActive,
    },
  };

  return (
    <div
      ref={itemRef}
      className={cn(
        'cursor-pointer select-none transition-colors',
        isActive && 'bg-primary-50 dark:bg-primary-900/20',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={role === 'tab' ? (isActive ? 0 : -1) : -1}
      aria-disabled={disabled}
      {...roleProps[role]}
    >
      {children}
    </div>
  );
};

interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: Array<{
    label: string;
    value: any;
    disabled?: boolean;
    onClick?: () => void;
  }>;
  onSelect?: (item: any) => void;
  className?: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  items,
  onSelect,
  className,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleSelect = (index: number, item: any) => {
    onSelect?.(item);
    item.onClick?.();
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const handleEscape = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div className={cn('relative', className)}>
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            setIsOpen(true);
          }
        }}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
      >
        {trigger}
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 rounded-lg shadow-lg z-50 min-w-full">
          <KeyboardNavigable
            items={items}
            onSelect={handleSelect}
            onEscape={handleEscape}
            className="py-1"
          >
            {items.map((item, index) => (
              <NavigableItem
                key={index}
                index={index}
                disabled={item.disabled}
                className="px-3 py-2 text-sm hover:bg-secondary-50 dark:hover:bg-secondary-700"
              >
                {item.label}
              </NavigableItem>
            ))}
          </KeyboardNavigable>
        </div>
      )}
    </div>
  );
};

export { KeyboardNavigable, NavigableItem, DropdownMenu };
export type { KeyboardNavigableProps, NavigableItemProps, DropdownMenuProps };