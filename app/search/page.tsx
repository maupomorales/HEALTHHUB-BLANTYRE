"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Phone,
  Clock,
  Pill,
  Eye,
  Smile,
  Dumbbell,
  Sparkles,
  Search,
  Star,
  ArrowRight,
  Filter,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"

// Comprehensive data for all Blantyre areas
const serviceData = {
  Blantyre: {
    pharmacies: [
      {
        name: "Central Pharmacy Blantyre",
        rating: 4.8,
        address: "Victoria Avenue",
        phone: "+265 1 620 123",
        hours: "24/7",
        services: ["Prescription", "OTC", "Consultation", "Emergency"],
      },
      {
        name: "MediCare Pharmacy",
        rating: 4.6,
        address: "Glyn Jones Road",
        phone: "+265 1 620 456",
        hours: "7AM-10PM",
        services: ["Prescription", "Medical Supplies", "Health Screening"],
      },
    ],
    dentists: [
      {
        name: "Blantyre Dental Clinic",
        rating: 4.7,
        address: "Henderson Street",
        phone: "+265 1 621 789",
        hours: "8AM-5PM",
        services: ["General Dentistry", "Cleaning", "Orthodontics"],
      },
    ],
    opticians: [
      {
        name: "Vision Care Blantyre",
        rating: 4.9,
        address: "Victoria Avenue",
        phone: "+265 1 622 345",
        hours: "8AM-6PM",
        services: ["Eye Exams", "Glasses", "Contact Lenses"],
      },
    ],
    gyms: [
      {
        name: "City Fitness Center",
        rating: 4.4,
        address: "Masauko Chipembere Highway",
        phone: "+265 1 623 678",
        hours: "5AM-10PM",
        services: ["Cardio", "Weights", "Classes"],
      },
    ],
    skincare: [
      {
        name: "Glow Beauty Center",
        rating: 4.6,
        address: "Victoria Avenue",
        phone: "+265 1 624 901",
        hours: "9AM-7PM",
        services: ["Facials", "Products", "Treatments"],
      },
    ],
  },
  Mapanga: {
    pharmacies: [
      {
        name: "Mapanga Community Pharmacy",
        rating: 4.3,
        address: "Mapanga Trading Center",
        phone: "+265 1 630 234",
        hours: "7AM-8PM",
        services: ["Prescription", "Basic Consultation"],
      },
    ],
    dentists: [
      {
        name: "Mapanga Dental Care",
        rating: 4.2,
        address: "Mapanga Main Road",
        phone: "+265 1 631 567",
        hours: "8AM-5PM",
        services: ["General Dentistry", "Emergency Care"],
      },
    ],
    opticians: [
      {
        name: "Clear Vision Mapanga",
        rating: 4.1,
        address: "Mapanga Market",
        phone: "+265 1 632 890",
        hours: "9AM-6PM",
        services: ["Eye Tests", "Budget Glasses"],
      },
    ],
    gyms: [
      {
        name: "Mapanga Fitness",
        rating: 4.0,
        address: "Mapanga Community Center",
        phone: "+265 1 633 123",
        hours: "6AM-9PM",
        services: ["Basic Equipment", "Group Classes"],
      },
    ],
    skincare: [
      {
        name: "Natural Beauty Mapanga",
        rating: 4.2,
        address: "Mapanga Trading Center",
        phone: "+265 1 634 456",
        hours: "9AM-6PM",
        services: ["Natural Products", "Basic Treatments"],
      },
    ],
  },
  Kachere: {
    pharmacies: [
      {
        name: "Kachere Health Pharmacy",
        rating: 4.4,
        address: "Kachere Market",
        phone: "+265 1 640 789",
        hours: "7AM-9PM",
        services: ["Prescription", "Health Consultation", "Medical Supplies"],
      },
    ],
    dentists: [
      {
        name: "Kachere Dental Clinic",
        rating: 4.3,
        address: "Kachere Township",
        phone: "+265 1 641 012",
        hours: "8AM-5PM",
        services: ["General Dentistry", "Teeth Cleaning"],
      },
    ],
    opticians: [
      {
        name: "Kachere Eye Care",
        rating: 4.2,
        address: "Kachere Main Road",
        phone: "+265 1 642 345",
        hours: "8AM-6PM",
        services: ["Eye Exams", "Prescription Glasses"],
      },
    ],
    gyms: [
      {
        name: "Kachere Fitness Hub",
        rating: 4.1,
        address: "Kachere Community Hall",
        phone: "+265 1 643 678",
        hours: "6AM-9PM",
        services: ["Cardio Equipment", "Weight Training"],
      },
    ],
    skincare: [
      {
        name: "Beauty Plus Kachere",
        rating: 4.3,
        address: "Kachere Market",
        phone: "+265 1 644 901",
        hours: "9AM-7PM",
        services: ["Skincare Products", "Beauty Treatments"],
      },
    ],
  },
  Maone: {
    pharmacies: [
      {
        name: "Maone Pharmacy",
        rating: 4.2,
        address: "Maone Trading Center",
        phone: "+265 1 650 234",
        hours: "7AM-8PM",
        services: ["Prescription", "OTC Medicines"],
      },
    ],
    dentists: [
      {
        name: "Maone Dental Practice",
        rating: 4.1,
        address: "Maone Main Road",
        phone: "+265 1 651 567",
        hours: "8AM-5PM",
        services: ["Basic Dentistry", "Emergency Care"],
      },
    ],
    opticians: [
      {
        name: "Maone Vision Center",
        rating: 4.0,
        address: "Maone Market",
        phone: "+265 1 652 890",
        hours: "9AM-5PM",
        services: ["Eye Tests", "Reading Glasses"],
      },
    ],
    gyms: [
      {
        name: "Maone Community Gym",
        rating: 3.9,
        address: "Maone Community Center",
        phone: "+265 1 653 123",
        hours: "6AM-8PM",
        services: ["Basic Equipment", "Aerobics"],
      },
    ],
    skincare: [
      {
        name: "Maone Beauty Shop",
        rating: 4.1,
        address: "Maone Trading Center",
        phone: "+265 1 654 456",
        hours: "9AM-6PM",
        services: ["Beauty Products", "Skin Consultation"],
      },
    ],
  },
  Nkolokoti: {
    pharmacies: [
      {
        name: "Nkolokoti Pharmacy",
        rating: 4.3,
        address: "Nkolokoti Market",
        phone: "+265 1 660 789",
        hours: "7AM-9PM",
        services: ["Prescription", "Health Advice", "Medical Equipment"],
      },
    ],
    dentists: [
      {
        name: "Nkolokoti Dental Care",
        rating: 4.2,
        address: "Nkolokoti Township",
        phone: "+265 1 661 012",
        hours: "8AM-5PM",
        services: ["General Dentistry", "Oral Health"],
      },
    ],
    opticians: [
      {
        name: "Nkolokoti Eye Clinic",
        rating: 4.1,
        address: "Nkolokoti Main Road",
        phone: "+265 1 662 345",
        hours: "8AM-6PM",
        services: ["Eye Exams", "Glasses Repair"],
      },
    ],
    gyms: [
      {
        name: "Nkolokoti Fitness",
        rating: 4.0,
        address: "Nkolokoti Sports Ground",
        phone: "+265 1 663 678",
        hours: "6AM-9PM",
        services: ["Outdoor Training", "Group Fitness"],
      },
    ],
    skincare: [
      {
        name: "Nkolokoti Beauty Center",
        rating: 4.2,
        address: "Nkolokoti Market",
        phone: "+265 1 664 901",
        hours: "9AM-7PM",
        services: ["Skincare", "Hair Care", "Beauty Treatments"],
      },
    ],
  },
  Ndirande: {
    pharmacies: [
      {
        name: "Community Pharmacy Ndirande",
        rating: 4.2,
        address: "Ndirande Market",
        phone: "+265 1 670 012",
        hours: "7AM-8PM",
        services: ["Affordable Medicines", "Health Advice"],
      },
      {
        name: "Ndirande Health Pharmacy",
        rating: 4.1,
        address: "Ndirande Township",
        phone: "+265 1 670 345",
        hours: "8AM-7PM",
        services: ["Prescription", "Basic Consultation"],
      },
    ],
    dentists: [
      {
        name: "Ndirande Dental Clinic",
        rating: 4.3,
        address: "Ndirande Township",
        phone: "+265 1 671 345",
        hours: "8AM-5PM",
        services: ["Basic Dentistry", "Emergency Care"],
      },
    ],
    opticians: [
      {
        name: "Affordable Vision Ndirande",
        rating: 4.1,
        address: "Ndirande Market",
        phone: "+265 1 672 678",
        hours: "8AM-6PM",
        services: ["Budget Glasses", "Eye Tests"],
      },
    ],
    gyms: [
      {
        name: "Community Fitness Ndirande",
        rating: 4.0,
        address: "Ndirande Community Center",
        phone: "+265 1 673 901",
        hours: "6AM-9PM",
        services: ["Basic Equipment", "Group Classes"],
      },
    ],
    skincare: [
      {
        name: "Natural Beauty Ndirande",
        rating: 4.2,
        address: "Ndirande Market",
        phone: "+265 1 674 234",
        hours: "9AM-6PM",
        services: ["Natural Products", "Basic Treatments"],
      },
    ],
  },
  "South Lunzu": {
    pharmacies: [
      {
        name: "South Lunzu Pharmacy",
        rating: 4.4,
        address: "South Lunzu Trading Center",
        phone: "+265 1 680 567",
        hours: "7AM-9PM",
        services: ["Prescription", "Health Screening", "Medical Supplies"],
      },
    ],
    dentists: [
      {
        name: "South Lunzu Dental Practice",
        rating: 4.3,
        address: "South Lunzu Main Road",
        phone: "+265 1 681 890",
        hours: "8AM-5PM",
        services: ["General Dentistry", "Preventive Care"],
      },
    ],
    opticians: [
      {
        name: "South Lunzu Vision Care",
        rating: 4.2,
        address: "South Lunzu Market",
        phone: "+265 1 682 123",
        hours: "8AM-6PM",
        services: ["Eye Exams", "Contact Lenses", "Glasses"],
      },
    ],
    gyms: [
      {
        name: "South Lunzu Fitness Center",
        rating: 4.1,
        address: "South Lunzu Community Hall",
        phone: "+265 1 683 456",
        hours: "6AM-9PM",
        services: ["Modern Equipment", "Personal Training"],
      },
    ],
    skincare: [
      {
        name: "South Lunzu Beauty Hub",
        rating: 4.3,
        address: "South Lunzu Trading Center",
        phone: "+265 1 684 789",
        hours: "9AM-7PM",
        services: ["Premium Skincare", "Beauty Treatments"],
      },
    ],
  },
  Kameza: {
    pharmacies: [
      {
        name: "Kameza Health Pharmacy",
        rating: 4.3,
        address: "Kameza Market",
        phone: "+265 1 690 012",
        hours: "7AM-8PM",
        services: ["Prescription", "Health Consultation"],
      },
    ],
    dentists: [
      {
        name: "Kameza Dental Clinic",
        rating: 4.2,
        address: "Kameza Township",
        phone: "+265 1 691 345",
        hours: "8AM-5PM",
        services: ["General Dentistry", "Oral Care"],
      },
    ],
    opticians: [
      {
        name: "Kameza Eye Care",
        rating: 4.1,
        address: "Kameza Main Road",
        phone: "+265 1 692 678",
        hours: "9AM-6PM",
        services: ["Eye Tests", "Prescription Glasses"],
      },
    ],
    gyms: [
      {
        name: "Kameza Fitness",
        rating: 4.0,
        address: "Kameza Sports Complex",
        phone: "+265 1 693 901",
        hours: "6AM-9PM",
        services: ["Cardio", "Weight Training", "Group Classes"],
      },
    ],
    skincare: [
      {
        name: "Kameza Beauty Center",
        rating: 4.2,
        address: "Kameza Market",
        phone: "+265 1 694 234",
        hours: "9AM-7PM",
        services: ["Skincare Products", "Beauty Services"],
      },
    ],
  },
  Chirimba: {
    pharmacies: [
      {
        name: "Chirimba Pharmacy",
        rating: 4.2,
        address: "Chirimba Trading Center",
        phone: "+265 1 700 567",
        hours: "7AM-8PM",
        services: ["Prescription", "OTC Medicines", "Health Advice"],
      },
    ],
    dentists: [
      {
        name: "Chirimba Dental Care",
        rating: 4.1,
        address: "Chirimba Main Road",
        phone: "+265 1 701 890",
        hours: "8AM-5PM",
        services: ["Basic Dentistry", "Emergency Care"],
      },
    ],
    opticians: [
      {
        name: "Chirimba Vision Center",
        rating: 4.0,
        address: "Chirimba Market",
        phone: "+265 1 702 123",
        hours: "9AM-5PM",
        services: ["Eye Tests", "Reading Glasses"],
      },
    ],
    gyms: [
      {
        name: "Chirimba Community Gym",
        rating: 3.9,
        address: "Chirimba Community Center",
        phone: "+265 1 703 456",
        hours: "6AM-8PM",
        services: ["Basic Equipment", "Aerobics Classes"],
      },
    ],
    skincare: [
      {
        name: "Chirimba Beauty Shop",
        rating: 4.1,
        address: "Chirimba Trading Center",
        phone: "+265 1 704 789",
        hours: "9AM-6PM",
        services: ["Beauty Products", "Skin Care"],
      },
    ],
  },
  Chemusa: {
    pharmacies: [
      {
        name: "Chemusa Health Pharmacy",
        rating: 4.3,
        address: "Chemusa Market",
        phone: "+265 1 710 012",
        hours: "7AM-9PM",
        services: ["Prescription", "Medical Supplies", "Health Screening"],
      },
    ],
    dentists: [
      {
        name: "Chemusa Dental Practice",
        rating: 4.2,
        address: "Chemusa Township",
        phone: "+265 1 711 345",
        hours: "8AM-5PM",
        services: ["General Dentistry", "Preventive Care"],
      },
    ],
    opticians: [
      {
        name: "Chemusa Eye Clinic",
        rating: 4.1,
        address: "Chemusa Main Road",
        phone: "+265 1 712 678",
        hours: "8AM-6PM",
        services: ["Eye Exams", "Glasses", "Contact Lenses"],
      },
    ],
    gyms: [
      {
        name: "Chemusa Fitness Hub",
        rating: 4.0,
        address: "Chemusa Sports Ground",
        phone: "+265 1 713 901",
        hours: "6AM-9PM",
        services: ["Modern Equipment", "Group Training"],
      },
    ],
    skincare: [
      {
        name: "Chemusa Beauty Center",
        rating: 4.2,
        address: "Chemusa Market",
        phone: "+265 1 714 234",
        hours: "9AM-7PM",
        services: ["Skincare", "Beauty Treatments", "Cosmetics"],
      },
    ],
  },
  Mbayani: {
    pharmacies: [
      {
        name: "Mbayani Community Pharmacy",
        rating: 4.1,
        address: "Mbayani Trading Center",
        phone: "+265 1 720 567",
        hours: "7AM-8PM",
        services: ["Prescription", "Basic Consultation"],
      },
    ],
    dentists: [
      {
        name: "Mbayani Dental Clinic",
        rating: 4.0,
        address: "Mbayani Township",
        phone: "+265 1 721 890",
        hours: "8AM-5PM",
        services: ["General Dentistry", "Oral Health"],
      },
    ],
    opticians: [
      {
        name: "Mbayani Vision Care",
        rating: 3.9,
        address: "Mbayani Market",
        phone: "+265 1 722 123",
        hours: "9AM-5PM",
        services: ["Eye Tests", "Budget Glasses"],
      },
    ],
    gyms: [
      {
        name: "Mbayani Fitness",
        rating: 3.8,
        address: "Mbayani Community Hall",
        phone: "+265 1 723 456",
        hours: "6AM-8PM",
        services: ["Basic Equipment", "Group Classes"],
      },
    ],
    skincare: [
      {
        name: "Mbayani Beauty Shop",
        rating: 4.0,
        address: "Mbayani Trading Center",
        phone: "+265 1 724 789",
        hours: "9AM-6PM",
        services: ["Natural Products", "Basic Treatments"],
      },
    ],
  },
  Nyambadwe: {
    pharmacies: [
      {
        name: "Nyambadwe Pharmacy",
        rating: 4.4,
        address: "Nyambadwe Market",
        phone: "+265 1 730 012",
        hours: "7AM-9PM",
        services: ["Prescription", "Health Consultation", "Medical Equipment"],
      },
    ],
    dentists: [
      {
        name: "Nyambadwe Dental Care",
        rating: 4.3,
        address: "Nyambadwe Main Road",
        phone: "+265 1 731 345",
        hours: "8AM-5PM",
        services: ["General Dentistry", "Emergency Care"],
      },
    ],
    opticians: [
      {
        name: "Nyambadwe Eye Care",
        rating: 4.2,
        address: "Nyambadwe Township",
        phone: "+265 1 732 678",
        hours: "8AM-6PM",
        services: ["Eye Exams", "Prescription Glasses", "Repairs"],
      },
    ],
    gyms: [
      {
        name: "Nyambadwe Fitness Center",
        rating: 4.1,
        address: "Nyambadwe Sports Complex",
        phone: "+265 1 733 901",
        hours: "6AM-9PM",
        services: ["Cardio Equipment", "Weight Training"],
      },
    ],
    skincare: [
      {
        name: "Nyambadwe Beauty Hub",
        rating: 4.3,
        address: "Nyambadwe Market",
        phone: "+265 1 734 234",
        hours: "9AM-7PM",
        services: ["Premium Skincare", "Beauty Treatments"],
      },
    ],
  },
  Chilomoni: {
    pharmacies: [
      {
        name: "Chilomoni Health Pharmacy",
        rating: 4.5,
        address: "Chilomoni Trading Center",
        phone: "+265 1 740 567",
        hours: "7AM-9PM",
        services: ["Prescription", "Health Screening", "Medical Supplies"],
      },
      {
        name: "Chilomoni Community Pharmacy",
        rating: 4.2,
        address: "Chilomoni Market",
        phone: "+265 1 740 890",
        hours: "8AM-8PM",
        services: ["OTC Medicines", "Health Advice"],
      },
    ],
    dentists: [
      {
        name: "Chilomoni Dental Clinic",
        rating: 4.4,
        address: "Chilomoni Township",
        phone: "+265 1 741 123",
        hours: "8AM-5PM",
        services: ["General Dentistry", "Orthodontics", "Emergency Care"],
      },
    ],
    opticians: [
      {
        name: "Chilomoni Vision Center",
        rating: 4.3,
        address: "Chilomoni Main Road",
        phone: "+265 1 742 456",
        hours: "8AM-6PM",
        services: ["Eye Exams", "Designer Frames", "Contact Lenses"],
      },
    ],
    gyms: [
      {
        name: "Chilomoni Fitness Hub",
        rating: 4.2,
        address: "Chilomoni Sports Ground",
        phone: "+265 1 743 789",
        hours: "6AM-10PM",
        services: ["Modern Equipment", "Personal Training", "Group Classes"],
      },
    ],
    skincare: [
      {
        name: "Chilomoni Beauty Center",
        rating: 4.4,
        address: "Chilomoni Trading Center",
        phone: "+265 1 744 012",
        hours: "9AM-7PM",
        services: ["Skincare Products", "Beauty Treatments", "Spa Services"],
      },
    ],
  },
  Namiwawa: {
    pharmacies: [
      {
        name: "Namiwawa Pharmacy",
        rating: 4.2,
        address: "Namiwawa Market",
        phone: "+265 1 750 345",
        hours: "7AM-8PM",
        services: ["Prescription", "OTC Medicines", "Health Consultation"],
      },
    ],
    dentists: [
      {
        name: "Namiwawa Dental Practice",
        rating: 4.1,
        address: "Namiwawa Township",
        phone: "+265 1 751 678",
        hours: "8AM-5PM",
        services: ["Basic Dentistry", "Preventive Care"],
      },
    ],
    opticians: [
      {
        name: "Namiwawa Eye Clinic",
        rating: 4.0,
        address: "Namiwawa Main Road",
        phone: "+265 1 752 901",
        hours: "9AM-6PM",
        services: ["Eye Tests", "Reading Glasses", "Repairs"],
      },
    ],
    gyms: [
      {
        name: "Namiwawa Community Gym",
        rating: 3.9,
        address: "Namiwawa Community Center",
        phone: "+265 1 753 234",
        hours: "6AM-8PM",
        services: ["Basic Equipment", "Aerobics"],
      },
    ],
    skincare: [
      {
        name: "Namiwawa Beauty Shop",
        rating: 4.1,
        address: "Namiwawa Market",
        phone: "+265 1 754 567",
        hours: "9AM-6PM",
        services: ["Beauty Products", "Skin Care Advice"],
      },
    ],
  },
  Sunnyside: {
    pharmacies: [
      {
        name: "Sunnyside Pharmacy",
        rating: 4.6,
        address: "Sunnyside Shopping Center",
        phone: "+265 1 760 890",
        hours: "7AM-10PM",
        services: ["Prescription", "Health Screening", "Premium Medicines"],
      },
    ],
    dentists: [
      {
        name: "Sunnyside Dental Clinic",
        rating: 4.5,
        address: "Sunnyside Medical Center",
        phone: "+265 1 761 123",
        hours: "8AM-6PM",
        services: ["General Dentistry", "Cosmetic Dentistry", "Orthodontics"],
      },
    ],
    opticians: [
      {
        name: "Sunnyside Vision Care",
        rating: 4.4,
        address: "Sunnyside Shopping Center",
        phone: "+265 1 762 456",
        hours: "8AM-7PM",
        services: ["Comprehensive Eye Care", "Designer Frames", "Contact Lenses"],
      },
    ],
    gyms: [
      {
        name: "Sunnyside Fitness Club",
        rating: 4.3,
        address: "Sunnyside Recreation Center",
        phone: "+265 1 763 789",
        hours: "5AM-10PM",
        services: ["Premium Equipment", "Personal Training", "Spa Services"],
      },
    ],
    skincare: [
      {
        name: "Sunnyside Beauty Spa",
        rating: 4.5,
        address: "Sunnyside Shopping Center",
        phone: "+265 1 764 012",
        hours: "9AM-8PM",
        services: ["Luxury Treatments", "Premium Products", "Spa Services"],
      },
    ],
  },
  Nancholi: {
    pharmacies: [
      {
        name: "Nancholi Health Pharmacy",
        rating: 4.3,
        address: "Nancholi Trading Center",
        phone: "+265 1 770 345",
        hours: "7AM-9PM",
        services: ["Prescription", "Medical Supplies", "Health Consultation"],
      },
    ],
    dentists: [
      {
        name: "Nancholi Dental Care",
        rating: 4.2,
        address: "Nancholi Township",
        phone: "+265 1 771 678",
        hours: "8AM-5PM",
        services: ["General Dentistry", "Emergency Care"],
      },
    ],
    opticians: [
      {
        name: "Pilirani Judo - Optometrist",
        rating: 4.7,
        address: "Nancholi Trading Center",
        phone: "+265 997 813 198",
        hours: "Mon-Fri: 8AM-5PM, Weekends: 8AM-1PM",
        services: ["Eye Exams", "Contact Lenses", "Glasses", "Professional Eye Care", "Vision Consultation"],
      },
      {
        name: "Clear Sight Nancholi",
        rating: 4.1,
        address: "Nancholi Market",
        phone: "+265 1 772 901",
        hours: "8AM-6PM",
        services: ["Eye Tests", "Reading Glasses", "Vision Therapy"],
      },
    ],
    gyms: [
      {
        name: "Nancholi Fitness",
        rating: 4.0,
        address: "Nancholi Sports Ground",
        phone: "+265 1 773 234",
        hours: "6AM-9PM",
        services: ["Cardio Equipment", "Group Training"],
      },
    ],
    skincare: [
      {
        name: "Nancholi Beauty Center",
        rating: 4.2,
        address: "Nancholi Trading Center",
        phone: "+265 1 774 567",
        hours: "9AM-7PM",
        services: ["Skincare Products", "Beauty Treatments"],
      },
    ],
  },
  Zingwangwa: {
    pharmacies: [
      {
        name: "Zingwangwa Pharmacy",
        rating: 4.4,
        address: "Zingwangwa Market",
        phone: "+265 1 780 890",
        hours: "7AM-9PM",
        services: ["Prescription", "Health Screening", "Medical Equipment"],
      },
    ],
    dentists: [
      {
        name: "Zingwangwa Dental Clinic",
        rating: 4.3,
        address: "Zingwangwa Main Road",
        phone: "+265 1 781 123",
        hours: "8AM-5PM",
        services: ["General Dentistry", "Oral Surgery"],
      },
    ],
    opticians: [
      {
        name: "Zingwangwa Eye Care",
        rating: 4.2,
        address: "Zingwangwa Township",
        phone: "+265 1 782 456",
        hours: "8AM-6PM",
        services: ["Eye Exams", "Prescription Glasses", "Repairs"],
      },
    ],
    gyms: [
      {
        name: "Zingwangwa Fitness Center",
        rating: 4.1,
        address: "Zingwangwa Community Hall",
        phone: "+265 1 783 789",
        hours: "6AM-9PM",
        services: ["Modern Equipment", "Personal Training"],
      },
    ],
    skincare: [
      {
        name: "Zingwangwa Beauty Hub",
        rating: 4.3,
        address: "Zingwangwa Market",
        phone: "+265 1 784 012",
        hours: "9AM-7PM",
        services: ["Premium Skincare", "Beauty Services"],
      },
    ],
  },
  Chilobwe: {
    pharmacies: [
      {
        name: "Chilobwe Health Pharmacy",
        rating: 4.5,
        address: "Chilobwe Trading Center",
        phone: "+265 1 790 345",
        hours: "7AM-9PM",
        services: ["Prescription", "Health Consultation", "Medical Supplies"],
      },
    ],
    dentists: [
      {
        name: "Chilobwe Dental Practice",
        rating: 4.4,
        address: "Chilobwe Township",
        phone: "+265 1 791 678",
        hours: "8AM-5PM",
        services: ["General Dentistry", "Preventive Care", "Emergency Care"],
      },
    ],
    opticians: [
      {
        name: "Chilobwe Vision Care",
        rating: 4.3,
        address: "Chilobwe Main Road",
        phone: "+265 1 792 901",
        hours: "8AM-6PM",
        services: ["Comprehensive Eye Care", "Contact Lenses"],
      },
    ],
    gyms: [
      {
        name: "Chilobwe Fitness Hub",
        rating: 4.2,
        address: "Chilobwe Sports Complex",
        phone: "+265 1 793 234",
        hours: "6AM-10PM",
        services: ["Modern Equipment", "Group Classes", "Personal Training"],
      },
    ],
    skincare: [
      {
        name: "Chilobwe Beauty Center",
        rating: 4.4,
        address: "Chilobwe Trading Center",
        phone: "+265 1 794 567",
        hours: "9AM-7PM",
        services: ["Skincare Products", "Beauty Treatments", "Cosmetics"],
      },
    ],
  },
  Chimwankhunda: {
    pharmacies: [
      {
        name: "Chimwankhunda Pharmacy",
        rating: 4.2,
        address: "Chimwankhunda Market",
        phone: "+265 1 800 890",
        hours: "7AM-8PM",
        services: ["Prescription", "OTC Medicines", "Health Advice"],
      },
    ],
    dentists: [
      {
        name: "Chimwankhunda Dental Care",
        rating: 4.1,
        address: "Chimwankhunda Township",
        phone: "+265 1 801 123",
        hours: "8AM-5PM",
        services: ["Basic Dentistry", "Oral Health"],
      },
    ],
    opticians: [
      {
        name: "Chimwankhunda Eye Clinic",
        rating: 4.0,
        address: "Chimwankhunda Main Road",
        phone: "+265 1 802 456",
        hours: "9AM-6PM",
        services: ["Eye Tests", "Reading Glasses"],
      },
    ],
    gyms: [
      {
        name: "Chimwankhunda Community Gym",
        rating: 3.9,
        address: "Chimwankhunda Community Center",
        phone: "+265 1 803 789",
        hours: "6AM-8PM",
        services: ["Basic Equipment", "Group Classes"],
      },
    ],
    skincare: [
      {
        name: "Chimwankhunda Beauty Shop",
        rating: 4.1,
        address: "Chimwankhunda Market",
        phone: "+265 1 804 012",
        hours: "9AM-6PM",
        services: ["Beauty Products", "Skin Care"],
      },
    ],
  },
  Manja: {
    pharmacies: [
      {
        name: "Manja Health Pharmacy",
        rating: 4.3,
        address: "Manja Trading Center",
        phone: "+265 1 810 345",
        hours: "7AM-9PM",
        services: ["Prescription", "Medical Supplies", "Health Screening"],
      },
    ],
    dentists: [
      {
        name: "Manja Dental Clinic",
        rating: 4.2,
        address: "Manja Township",
        phone: "+265 1 811 678",
        hours: "8AM-5PM",
        services: ["General Dentistry", "Emergency Care"],
      },
    ],
    opticians: [
      {
        name: "Manja Vision Center",
        rating: 4.1,
        address: "Manja Market",
        phone: "+265 1 812 901",
        hours: "8AM-6PM",
        services: ["Eye Exams", "Prescription Glasses"],
      },
    ],
    gyms: [
      {
        name: "Manja Fitness",
        rating: 4.0,
        address: "Manja Sports Ground",
        phone: "+265 1 813 234",
        hours: "6AM-9PM",
        services: ["Cardio Equipment", "Weight Training"],
      },
    ],
    skincare: [
      {
        name: "Manja Beauty Center",
        rating: 4.2,
        address: "Manja Trading Center",
        phone: "+265 1 814 567",
        hours: "9AM-7PM",
        services: ["Skincare", "Beauty Treatments"],
      },
    ],
  },
  Nkolokosa: {
    pharmacies: [
      {
        name: "Nkolokosa Pharmacy",
        rating: 4.1,
        address: "Nkolokosa Market",
        phone: "+265 1 820 890",
        hours: "7AM-8PM",
        services: ["Prescription", "Basic Consultation"],
      },
    ],
    dentists: [
      {
        name: "Nkolokosa Dental Practice",
        rating: 4.0,
        address: "Nkolokosa Township",
        phone: "+265 1 821 123",
        hours: "8AM-5PM",
        services: ["General Dentistry", "Preventive Care"],
      },
    ],
    opticians: [
      {
        name: "Nkolokosa Eye Care",
        rating: 3.9,
        address: "Nkolokosa Main Road",
        phone: "+265 1 822 456",
        hours: "9AM-5PM",
        services: ["Eye Tests", "Budget Glasses"],
      },
    ],
    gyms: [
      {
        name: "Nkolokosa Community Gym",
        rating: 3.8,
        address: "Nkolokosa Community Hall",
        phone: "+265 1 823 789",
        hours: "6AM-8PM",
        services: ["Basic Equipment", "Aerobics"],
      },
    ],
    skincare: [
      {
        name: "Nkolokosa Beauty Shop",
        rating: 4.0,
        address: "Nkolokosa Market",
        phone: "+265 1 824 012",
        hours: "9AM-6PM",
        services: ["Natural Products", "Basic Treatments"],
      },
    ],
  },
  Chitawira: {
    pharmacies: [
      {
        name: "Chitawira Health Pharmacy",
        rating: 4.4,
        address: "Chitawira Trading Center",
        phone: "+265 1 830 345",
        hours: "7AM-9PM",
        services: ["Prescription", "Health Consultation", "Medical Equipment"],
      },
    ],
    dentists: [
      {
        name: "Chitawira Dental Care",
        rating: 4.3,
        address: "Chitawira Township",
        phone: "+265 1 831 678",
        hours: "8AM-5PM",
        services: ["General Dentistry", "Oral Surgery"],
      },
    ],
    opticians: [
      {
        name: "Chitawira Vision Center",
        rating: 4.2,
        address: "Chitawira Market",
        phone: "+265 1 832 901",
        hours: "8AM-6PM",
        services: ["Eye Exams", "Designer Frames", "Contact Lenses"],
      },
    ],
    gyms: [
      {
        name: "Chitawira Fitness Hub",
        rating: 4.1,
        address: "Chitawira Sports Complex",
        phone: "+265 1 833 234",
        hours: "6AM-9PM",
        services: ["Modern Equipment", "Personal Training"],
      },
    ],
    skincare: [
      {
        name: "Chitawira Beauty Center",
        rating: 4.3,
        address: "Chitawira Trading Center",
        phone: "+265 1 834 567",
        hours: "9AM-7PM",
        services: ["Premium Skincare", "Beauty Treatments"],
      },
    ],
  },
  Naperi: {
    pharmacies: [
      {
        name: "Naperi Pharmacy",
        rating: 4.2,
        address: "Naperi Market",
        phone: "+265 1 840 890",
        hours: "7AM-8PM",
        services: ["Prescription", "OTC Medicines", "Health Advice"],
      },
    ],
    dentists: [
      {
        name: "Naperi Dental Clinic",
        rating: 4.1,
        address: "Naperi Township",
        phone: "+265 1 841 123",
        hours: "8AM-5PM",
        services: ["Basic Dentistry", "Emergency Care"],
      },
    ],
    opticians: [
      {
        name: "Naperi Eye Care",
        rating: 4.0,
        address: "Naperi Main Road",
        phone: "+265 1 842 456",
        hours: "9AM-6PM",
        services: ["Eye Tests", "Prescription Glasses"],
      },
    ],
    gyms: [
      {
        name: "Naperi Fitness",
        rating: 3.9,
        address: "Naperi Community Center",
        phone: "+265 1 843 789",
        hours: "6AM-8PM",
        services: ["Basic Equipment", "Group Classes"],
      },
    ],
    skincare: [
      {
        name: "Naperi Beauty Shop",
        rating: 4.1,
        address: "Naperi Market",
        phone: "+265 1 844 012",
        hours: "9AM-6PM",
        services: ["Beauty Products", "Skin Care Advice"],
      },
    ],
  },
  "Mount Pleasant": {
    pharmacies: [
      {
        name: "Mount Pleasant Pharmacy",
        rating: 4.7,
        address: "Mount Pleasant Shopping Center",
        phone: "+265 1 850 345",
        hours: "7AM-10PM",
        services: ["Prescription", "Premium Medicines", "Health Screening"],
      },
    ],
    dentists: [
      {
        name: "Mount Pleasant Dental Clinic",
        rating: 4.6,
        address: "Mount Pleasant Medical Center",
        phone: "+265 1 851 678",
        hours: "8AM-6PM",
        services: ["General Dentistry", "Cosmetic Dentistry", "Orthodontics"],
      },
    ],
    opticians: [
      {
        name: "Mount Pleasant Vision Care",
        rating: 4.5,
        address: "Mount Pleasant Shopping Center",
        phone: "+265 1 852 901",
        hours: "8AM-7PM",
        services: ["Comprehensive Eye Care", "Luxury Frames", "Contact Lenses"],
      },
    ],
    gyms: [
      {
        name: "Mount Pleasant Fitness Club",
        rating: 4.4,
        address: "Mount Pleasant Recreation Center",
        phone: "+265 1 853 234",
        hours: "5AM-11PM",
        services: ["Premium Equipment", "Personal Training", "Spa Services"],
      },
    ],
    skincare: [
      {
        name: "Mount Pleasant Beauty Spa",
        rating: 4.6,
        address: "Mount Pleasant Shopping Center",
        phone: "+265 1 854 567",
        hours: "9AM-8PM",
        services: ["Luxury Treatments", "Premium Products", "Medical Spa"],
      },
    ],
  },
  Mandala: {
    pharmacies: [
      {
        name: "Mandala Health Pharmacy",
        rating: 4.6,
        address: "Mandala Road",
        phone: "+265 1 660 567",
        hours: "7AM-9PM",
        services: ["Prescription", "Health Screening"],
      },
    ],
    dentists: [
      {
        name: "Mandala Dental Practice",
        rating: 4.8,
        address: "Mandala Heights",
        phone: "+265 1 661 890",
        hours: "8AM-6PM",
        services: ["Orthodontics", "Oral Surgery"],
      },
    ],
    opticians: [
      {
        name: "Eye Care Mandala",
        rating: 4.6,
        address: "Mandala Road",
        phone: "+265 1 662 123",
        hours: "8AM-5PM",
        services: ["Comprehensive Eye Care", "Contact Lenses"],
      },
    ],
    gyms: [
      {
        name: "Elite Fitness Mandala",
        rating: 4.5,
        address: "Mandala Heights",
        phone: "+265 1 663 456",
        hours: "6AM-10PM",
        services: ["Premium Equipment", "Personal Training"],
      },
    ],
    skincare: [
      {
        name: "Luxe Beauty Mandala",
        rating: 4.7,
        address: "Mandala Road",
        phone: "+265 1 664 789",
        hours: "10AM-8PM",
        services: ["Luxury Treatments", "Premium Products"],
      },
    ],
  },
  Chichiri: {
    pharmacies: [
      {
        name: "Chichiri Pharmacy",
        rating: 4.4,
        address: "Chichiri Shopping Center",
        phone: "+265 1 650 012",
        hours: "8AM-8PM",
        services: ["Prescription", "OTC Medicines"],
      },
    ],
    dentists: [
      {
        name: "Chichiri Dental Clinic",
        rating: 4.5,
        address: "Chichiri Trade Fair Grounds",
        phone: "+265 1 651 345",
        hours: "8AM-5PM",
        services: ["General Dentistry", "Teeth Whitening"],
      },
    ],
    opticians: [
      {
        name: "Specs Appeal Chichiri",
        rating: 4.3,
        address: "Chichiri Shopping Center",
        phone: "+265 1 652 678",
        hours: "9AM-6PM",
        services: ["Eye Exams", "Designer Frames"],
      },
    ],
    gyms: [
      {
        name: "PowerHouse Gym",
        rating: 4.7,
        address: "Chichiri Industrial Area",
        phone: "+265 1 653 901",
        hours: "5AM-11PM",
        services: ["Modern Equipment", "Nutrition Guidance"],
      },
    ],
    skincare: [
      {
        name: "Radiant Skin Chichiri",
        rating: 4.5,
        address: "Chichiri Shopping Center",
        phone: "+265 1 654 234",
        hours: "9AM-6PM",
        services: ["Anti-aging", "Acne Treatment"],
      },
    ],
  },
  Chinyonga: {
    pharmacies: [
      {
        name: "Chinyonga Health Pharmacy",
        rating: 4.3,
        address: "Chinyonga Trading Center",
        phone: "+265 1 870 890",
        hours: "7AM-9PM",
        services: ["Prescription", "Medical Supplies", "Health Consultation"],
      },
    ],
    dentists: [
      {
        name: "Chinyonga Dental Care",
        rating: 4.2,
        address: "Chinyonga Township",
        phone: "+265 1 871 123",
        hours: "8AM-5PM",
        services: ["General Dentistry", "Preventive Care"],
      },
    ],
    opticians: [
      {
        name: "Chinyonga Vision Center",
        rating: 4.1,
        address: "Chinyonga Market",
        phone: "+265 1 872 456",
        hours: "8AM-6PM",
        services: ["Eye Exams", "Glasses", "Vision Therapy"],
      },
    ],
    gyms: [
      {
        name: "Chinyonga Fitness",
        rating: 4.0,
        address: "Chinyonga Sports Ground",
        phone: "+265 1 873 789",
        hours: "6AM-9PM",
        services: ["Cardio Equipment", "Group Training"],
      },
    ],
    skincare: [
      {
        name: "Chinyonga Beauty Center",
        rating: 4.2,
        address: "Chinyonga Trading Center",
        phone: "+265 1 874 012",
        hours: "9AM-7PM",
        services: ["Skincare Products", "Beauty Treatments"],
      },
    ],
  },
  Kanjedza: {
    pharmacies: [
      {
        name: "Kanjedza Pharmacy",
        rating: 4.4,
        address: "Kanjedza Market",
        phone: "+265 1 880 345",
        hours: "7AM-9PM",
        services: ["Prescription", "Health Screening", "Medical Equipment"],
      },
    ],
    dentists: [
      {
        name: "Kanjedza Dental Clinic",
        rating: 4.3,
        address: "Kanjedza Township",
        phone: "+265 1 881 678",
        hours: "8AM-5PM",
        services: ["General Dentistry", "Emergency Care"],
      },
    ],
    opticians: [
      {
        name: "Kanjedza Eye Care",
        rating: 4.2,
        address: "Kanjedza Main Road",
        phone: "+265 1 882 901",
        hours: "8AM-6PM",
        services: ["Eye Exams", "Prescription Glasses", "Repairs"],
      },
    ],
    gyms: [
      {
        name: "Kanjedza Fitness Center",
        rating: 4.1,
        address: "Kanjedza Community Hall",
        phone: "+265 1 883 234",
        hours: "6AM-9PM",
        services: ["Modern Equipment", "Personal Training"],
      },
    ],
    skincare: [
      {
        name: "Kanjedza Beauty Hub",
        rating: 4.3,
        address: "Kanjedza Market",
        phone: "+265 1 884 567",
        hours: "9AM-7PM",
        services: ["Premium Skincare", "Beauty Services"],
      },
    ],
  },
  Mudi: {
    pharmacies: [
      {
        name: "Mudi Health Pharmacy",
        rating: 4.2,
        address: "Mudi Trading Center",
        phone: "+265 1 890 890",
        hours: "7AM-8PM",
        services: ["Prescription", "OTC Medicines", "Health Advice"],
      },
    ],
    dentists: [
      {
        name: "Mudi Dental Practice",
        rating: 4.1,
        address: "Mudi Township",
        phone: "+265 1 891 123",
        hours: "8AM-5PM",
        services: ["Basic Dentistry", "Oral Health"],
      },
    ],
    opticians: [
      {
        name: "Mudi Vision Care",
        rating: 4.0,
        address: "Mudi Market",
        phone: "+265 1 892 456",
        hours: "9AM-6PM",
        services: ["Eye Tests", "Reading Glasses"],
      },
    ],
    gyms: [
      {
        name: "Mudi Community Gym",
        rating: 3.9,
        address: "Mudi Community Center",
        phone: "+265 1 893 789",
        hours: "6AM-8PM",
        services: ["Basic Equipment", "Group Classes"],
      },
    ],
    skincare: [
      {
        name: "Mudi Beauty Shop",
        rating: 4.1,
        address: "Mudi Trading Center",
        phone: "+265 1 894 012",
        hours: "9AM-6PM",
        services: ["Beauty Products", "Skin Care"],
      },
    ],
  },
  Limbe: {
    pharmacies: [
      {
        name: "HealthPlus Pharmacy",
        rating: 4.5,
        address: "Masauko Chipembere Highway",
        phone: "+265 1 640 234",
        hours: "7AM-9PM",
        services: ["Prescription", "Health Consultation"],
      },
      {
        name: "Limbe Medical Supplies",
        rating: 4.3,
        address: "Kamuzu Road",
        phone: "+265 1 640 567",
        hours: "8AM-8PM",
        services: ["Medical Equipment", "Prescription"],
      },
    ],
    dentists: [
      {
        name: "Limbe Dental Care",
        rating: 4.6,
        address: "Kamuzu Road",
        phone: "+265 1 641 890",
        hours: "8AM-5PM",
        services: ["General Dentistry", "Emergency Care"],
      },
    ],
    opticians: [
      {
        name: "Clear Vision Limbe",
        rating: 4.4,
        address: "Masauko Chipembere Highway",
        phone: "+265 1 642 123",
        hours: "8AM-6PM",
        services: ["Eye Tests", "Prescription Glasses"],
      },
    ],
    gyms: [
      {
        name: "FitLife Gym Limbe",
        rating: 4.6,
        address: "Industrial Area",
        phone: "+265 1 643 456",
        hours: "5AM-10PM",
        services: ["Personal Training", "Group Classes"],
      },
    ],
    skincare: [
      {
        name: "Beauty Essence Limbe",
        rating: 4.8,
        address: "Kamuzu Road",
        phone: "+265 1 644 789",
        hours: "9AM-7PM",
        services: ["Skincare Products", "Beauty Treatments"],
      },
    ],
  },
  Mpingwe: {
    pharmacies: [
      {
        name: "Mpingwe Pharmacy",
        rating: 4.3,
        address: "Mpingwe Market",
        phone: "+265 1 900 345",
        hours: "7AM-8PM",
        services: ["Prescription", "Basic Consultation"],
      },
    ],
    dentists: [
      {
        name: "Mpingwe Dental Clinic",
        rating: 4.2,
        address: "Mpingwe Township",
        phone: "+265 1 901 678",
        hours: "8AM-5PM",
        services: ["General Dentistry", "Preventive Care"],
      },
    ],
    opticians: [
      {
        name: "Mpingwe Eye Care",
        rating: 4.1,
        address: "Mpingwe Main Road",
        phone: "+265 1 902 901",
        hours: "9AM-6PM",
        services: ["Eye Tests", "Budget Glasses"],
      },
    ],
    gyms: [
      {
        name: "Mpingwe Fitness",
        rating: 4.0,
        address: "Mpingwe Sports Ground",
        phone: "+265 1 903 234",
        hours: "6AM-9PM",
        services: ["Cardio Equipment", "Weight Training"],
      },
    ],
    skincare: [
      {
        name: "Mpingwe Beauty Center",
        rating: 4.2,
        address: "Mpingwe Market",
        phone: "+265 1 904 567",
        hours: "9AM-7PM",
        services: ["Skincare", "Beauty Treatments"],
      },
    ],
  },
  Bangwe: {
    pharmacies: [
      {
        name: "Bangwe Health Pharmacy",
        rating: 4.4,
        address: "Bangwe Trading Center",
        phone: "+265 1 910 890",
        hours: "7AM-9PM",
        services: ["Prescription", "Health Consultation", "Medical Supplies"],
      },
    ],
    dentists: [
      {
        name: "Bangwe Dental Care",
        rating: 4.3,
        address: "Bangwe Township",
        phone: "+265 1 911 123",
        hours: "8AM-5PM",
        services: ["General Dentistry", "Emergency Care"],
      },
    ],
    opticians: [
      {
        name: "Bangwe Vision Center",
        rating: 4.2,
        address: "Bangwe Market",
        phone: "+265 1 912 456",
        hours: "8AM-6PM",
        services: ["Eye Exams", "Prescription Glasses"],
      },
    ],
    gyms: [
      {
        name: "Bangwe Fitness Hub",
        rating: 4.1,
        address: "Bangwe Sports Complex",
        phone: "+265 1 913 789",
        hours: "6AM-9PM",
        services: ["Modern Equipment", "Group Training"],
      },
    ],
    skincare: [
      {
        name: "Bangwe Beauty Center",
        rating: 4.3,
        address: "Bangwe Trading Center",
        phone: "+265 1 914 012",
        hours: "9AM-7PM",
        services: ["Premium Skincare", "Beauty Treatments"],
      },
    ],
  },
  Namiyango: {
    pharmacies: [
      {
        name: "Namiyango Pharmacy",
        rating: 4.2,
        address: "Namiyango Market",
        phone: "+265 1 920 345",
        hours: "7AM-8PM",
        services: ["Prescription", "OTC Medicines", "Health Advice"],
      },
    ],
    dentists: [
      {
        name: "Namiyango Dental Clinic",
        rating: 4.1,
        address: "Namiyango Township",
        phone: "+265 1 921 678",
        hours: "8AM-5PM",
        services: ["Basic Dentistry", "Oral Health"],
      },
    ],
    opticians: [
      {
        name: "Namiyango Eye Care",
        rating: 4.0,
        address: "Namiyango Main Road",
        phone: "+265 1 922 901",
        hours: "9AM-6PM",
        services: ["Eye Tests", "Reading Glasses"],
      },
    ],
    gyms: [
      {
        name: "Namiyango Community Gym",
        rating: 3.9,
        address: "Namiyango Community Center",
        phone: "+265 1 923 234",
        hours: "6AM-8PM",
        services: ["Basic Equipment", "Aerobics"],
      },
    ],
    skincare: [
      {
        name: "Namiyango Beauty Shop",
        rating: 4.1,
        address: "Namiyango Market",
        phone: "+265 1 924 567",
        hours: "9AM-6PM",
        services: ["Beauty Products", "Skin Care Advice"],
      },
    ],
  },
  BCA: {
    pharmacies: [
      {
        name: "BCA Health Pharmacy",
        rating: 4.5,
        address: "BCA Campus",
        phone: "+265 1 930 890",
        hours: "7AM-9PM",
        services: ["Prescription", "Student Health", "Medical Supplies"],
      },
    ],
    dentists: [
      {
        name: "BCA Dental Clinic",
        rating: 4.4,
        address: "BCA Medical Center",
        phone: "+265 1 931 123",
        hours: "8AM-5PM",
        services: ["General Dentistry", "Student Discounts"],
      },
    ],
    opticians: [
      {
        name: "BCA Vision Care",
        rating: 4.3,
        address: "BCA Campus",
        phone: "+265 1 932 456",
        hours: "8AM-6PM",
        services: ["Eye Exams", "Student Glasses", "Contact Lenses"],
      },
    ],
    gyms: [
      {
        name: "BCA Fitness Center",
        rating: 4.2,
        address: "BCA Sports Complex",
        phone: "+265 1 933 789",
        hours: "6AM-10PM",
        services: ["Student Gym", "Modern Equipment", "Group Classes"],
      },
    ],
    skincare: [
      {
        name: "BCA Beauty Center",
        rating: 4.3,
        address: "BCA Campus",
        phone: "+265 1 934 012",
        hours: "9AM-7PM",
        services: ["Student Beauty Services", "Skincare Products"],
      },
    ],
  },
  Misesa: {
    pharmacies: [
      {
        name: "Misesa Pharmacy",
        rating: 4.1,
        address: "Misesa Trading Center",
        phone: "+265 1 940 345",
        hours: "7AM-8PM",
        services: ["Prescription", "Basic Consultation"],
      },
    ],
    dentists: [
      {
        name: "Misesa Dental Practice",
        rating: 4.0,
        address: "Misesa Township",
        phone: "+265 1 941 678",
        hours: "8AM-5PM",
        services: ["General Dentistry", "Preventive Care"],
      },
    ],
    opticians: [
      {
        name: "Misesa Eye Care",
        rating: 3.9,
        address: "Misesa Market",
        phone: "+265 1 942 901",
        hours: "9AM-5PM",
        services: ["Eye Tests", "Budget Glasses"],
      },
    ],
    gyms: [
      {
        name: "Misesa Community Gym",
        rating: 3.8,
        address: "Misesa Community Hall",
        phone: "+265 1 943 234",
        hours: "6AM-8PM",
        services: ["Basic Equipment", "Group Classes"],
      },
    ],
    skincare: [
      {
        name: "Misesa Beauty Shop",
        rating: 4.0,
        address: "Misesa Trading Center",
        phone: "+265 1 944 567",
        hours: "9AM-6PM",
        services: ["Natural Products", "Basic Treatments"],
      },
    ],
  },
  Chiwembe: {
    pharmacies: [
      {
        name: "Chiwembe Health Pharmacy",
        rating: 4.3,
        address: "Chiwembe Market",
        phone: "+265 1 950 890",
        hours: "7AM-9PM",
        services: ["Prescription", "Health Consultation", "Medical Equipment"],
      },
    ],
    dentists: [
      {
        name: "Chiwembe Dental Care",
        rating: 4.2,
        address: "Chiwembe Township",
        phone: "+265 1 951 123",
        hours: "8AM-5PM",
        services: ["General Dentistry", "Emergency Care"],
      },
    ],
    opticians: [
      {
        name: "Chiwembe Vision Center",
        rating: 4.1,
        address: "Chiwembe Market",
        phone: "+265 1 952 456",
        hours: "8AM-6PM",
        services: ["Eye Exams", "Prescription Glasses"],
      },
    ],
    gyms: [
      {
        name: "Chiwembe Fitness",
        rating: 4.0,
        address: "Chiwembe Sports Ground",
        phone: "+265 1 953 789",
        hours: "6AM-9PM",
        services: ["Cardio Equipment", "Group Training"],
      },
    ],
    skincare: [
      {
        name: "Chiwembe Beauty Center",
        rating: 4.2,
        address: "Chiwembe Market",
        phone: "+265 1 954 012",
        hours: "9AM-7PM",
        services: ["Skincare Products", "Beauty Treatments"],
      },
    ],
  },
  Angelogothere: {
    pharmacies: [
      {
        name: "Angelogothere Pharmacy",
        rating: 4.2,
        address: "Angelogothere Trading Center",
        phone: "+265 1 960 345",
        hours: "7AM-8PM",
        services: ["Prescription", "OTC Medicines", "Health Advice"],
      },
    ],
    dentists: [
      {
        name: "Angelogothere Dental Clinic",
        rating: 4.1,
        address: "Angelogothere Township",
        phone: "+265 1 961 678",
        hours: "8AM-5PM",
        services: ["Basic Dentistry", "Oral Health"],
      },
    ],
    opticians: [
      {
        name: "Angelogothere Eye Care",
        rating: 4.0,
        address: "Angelogothere Main Road",
        phone: "+265 1 962 901",
        hours: "9AM-6PM",
        services: ["Eye Tests", "Reading Glasses"],
      },
    ],
    gyms: [
      {
        name: "Angelogothere Community Gym",
        rating: 3.9,
        address: "Angelogothere Community Center",
        phone: "+265 1 963 234",
        hours: "6AM-8PM",
        services: ["Basic Equipment", "Group Classes"],
      },
    ],
    skincare: [
      {
        name: "Angelogothere Beauty Shop",
        rating: 4.1,
        address: "Angelogothere Trading Center",
        phone: "+265 1 964 567",
        hours: "9AM-6PM",
        services: ["Beauty Products", "Skin Care"],
      },
    ],
  },
  "Che Somba": {
    pharmacies: [
      {
        name: "Che Somba Health Pharmacy",
        rating: 4.3,
        address: "Che Somba Market",
        phone: "+265 1 970 890",
        hours: "7AM-9PM",
        services: ["Prescription", "Health Consultation", "Medical Supplies"],
      },
    ],
    dentists: [
      {
        name: "Che Somba Dental Care",
        rating: 4.2,
        address: "Che Somba Township",
        phone: "+265 1 971 123",
        hours: "8AM-5PM",
        services: ["General Dentistry", "Preventive Care"],
      },
    ],
    opticians: [
      {
        name: "Che Somba Vision Center",
        rating: 4.1,
        address: "Che Somba Main Road",
        phone: "+265 1 972 456",
        hours: "8AM-6PM",
        services: ["Eye Exams", "Glasses", "Vision Therapy"],
      },
    ],
    gyms: [
      {
        name: "Che Somba Fitness",
        rating: 4.0,
        address: "Che Somba Sports Ground",
        phone: "+265 1 973 789",
        hours: "6AM-9PM",
        services: ["Cardio Equipment", "Weight Training"],
      },
    ],
    skincare: [
      {
        name: "Che Somba Beauty Center",
        rating: 4.2,
        address: "Che Somba Market",
        phone: "+265 1 974 012",
        hours: "9AM-7PM",
        services: ["Skincare", "Beauty Treatments"],
      },
    ],
  },
  Chigumula: {
    pharmacies: [
      {
        name: "Chigumula Pharmacy",
        rating: 4.1,
        address: "Chigumula Trading Center",
        phone: "+265 1 980 345",
        hours: "7AM-8PM",
        services: ["Prescription", "Basic Consultation"],
      },
    ],
    dentists: [
      {
        name: "Chigumula Dental Practice",
        rating: 4.0,
        address: "Chigumula Township",
        phone: "+265 1 981 678",
        hours: "8AM-5PM",
        services: ["General Dentistry", "Emergency Care"],
      },
    ],
    opticians: [
      {
        name: "Chigumula Eye Care",
        rating: 3.9,
        address: "Chigumula Market",
        phone: "+265 1 982 901",
        hours: "9AM-5PM",
        services: ["Eye Tests", "Budget Glasses"],
      },
    ],
    gyms: [
      {
        name: "Chigumula Community Gym",
        rating: 3.8,
        address: "Chigumula Community Hall",
        phone: "+265 1 983 234",
        hours: "6AM-8PM",
        services: ["Basic Equipment", "Aerobics"],
      },
    ],
    skincare: [
      {
        name: "Chigumula Beauty Shop",
        rating: 4.0,
        address: "Chigumula Trading Center",
        phone: "+265 1 984 567",
        hours: "9AM-6PM",
        services: ["Natural Products", "Basic Treatments"],
      },
    ],
  },
}

const categories = [
  { id: "all", name: "All Services", icon: Search, color: "bg-blue-100 text-blue-600" },
  { id: "pharmacies", name: "Pharmacies", icon: Pill, color: "bg-blue-100 text-blue-600" },
  { id: "dentists", name: "Dentists", icon: Smile, color: "bg-blue-100 text-blue-600" },
  { id: "opticians", name: "Opticians", icon: Eye, color: "bg-slate-100 text-slate-600" },
  { id: "gyms", name: "Gyms & Fitness", icon: Dumbbell, color: "bg-slate-100 text-slate-600" },
  { id: "skincare", name: "Skincare", icon: Sparkles, color: "bg-blue-100 text-blue-600" },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams?.get("q") || "")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [results, setResults] = useState<any>({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (searchQuery) {
      handleSearch()
    }
  }, [searchQuery, selectedCategory])

  const handleSearch = () => {
    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      const matchedAreas = Object.keys(serviceData).filter((area) =>
        area.toLowerCase().includes(searchQuery.toLowerCase()),
      )

      if (matchedAreas.length > 0) {
        const searchResults: any = {}
        matchedAreas.forEach((area) => {
          searchResults[area] = serviceData[area as keyof typeof serviceData]
        })
        setResults(searchResults)
      } else {
        setResults({})
      }
      setIsLoading(false)
    }, 500)
  }

  const getFilteredResults = (areaData: any) => {
    if (selectedCategory === "all") {
      return areaData
    }
    return { [selectedCategory]: areaData[selectedCategory] || [] }
  }

  const getTotalCount = () => {
    let total = 0
    Object.values(results).forEach((areaData: any) => {
      const filtered = getFilteredResults(areaData)
      Object.values(filtered).forEach((services: any) => {
        if (Array.isArray(services)) {
          total += services.length
        }
      })
    })
    return total
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50">
      {/* Header */}
      <header className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <Image src="/logo.png" alt="Health Hub MW Logo" width={50} height={50} className="object-contain" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Blantyre Health Hub</h1>
              <p className="text-xs text-gray-600">Your Complete Health Directory</p>
            </div>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/#services" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Services
            </Link>
            <Link href="/#directory" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Directory
            </Link>
            <Link href="/#about" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              About
            </Link>
            <Link href="/#contact" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Search Section */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Find Healthcare Services</h1>
            <p className="text-lg text-gray-600">Search by area to find trusted healthcare providers near you</p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-4 bg-gray-50 rounded-full shadow-lg p-2">
              <div className="flex-1 flex items-center px-4">
                <Search className="h-5 w-5 text-gray-400 mr-3" />
                <Input
                  placeholder="Enter area name (e.g., Blantyre, Limbe, Chichiri, Mandala...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-0 focus:ring-0 text-lg bg-transparent"
                />
              </div>
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 rounded-full px-8"
                onClick={handleSearch}
                disabled={isLoading}
              >
                {isLoading ? "Searching..." : "Search"} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Category Filter */}
          {Object.keys(results).length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="h-5 w-5 text-gray-600" />
                <span className="font-medium text-gray-700">Filter by category:</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className={
                        selectedCategory === category.id ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-blue-50"
                      }
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {category.name}
                    </Button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Searching for healthcare services...</p>
            </div>
          ) : Object.keys(results).length > 0 ? (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Search Results for "{searchQuery}"</h2>
                <p className="text-gray-600">
                  Found {getTotalCount()} healthcare {getTotalCount() === 1 ? "provider" : "providers"} in{" "}
                  {Object.keys(results).length} {Object.keys(results).length === 1 ? "area" : "areas"}
                </p>
              </div>

              {Object.entries(results).map(([area, areaData]: [string, any]) => {
                const filteredData = getFilteredResults(areaData)
                const hasResults = Object.values(filteredData).some(
                  (services: any) => Array.isArray(services) && services.length > 0,
                )

                if (!hasResults) return null

                return (
                  <div key={area} className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                      <MapPin className="h-6 w-6 text-blue-600" />
                      <h3 className="text-2xl font-bold text-gray-900">{area}</h3>
                    </div>

                    {Object.entries(filteredData).map(([category, services]: [string, any]) => {
                      if (!Array.isArray(services) || services.length === 0) return null

                      const categoryInfo = categories.find((cat) => cat.id === category)
                      const Icon = categoryInfo?.icon || Search

                      return (
                        <div key={category} className="mb-8">
                          <div className="flex items-center gap-3 mb-4">
                            <div className={`p-2 rounded-full ${categoryInfo?.color || "bg-gray-100 text-gray-600"}`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <h4 className="text-xl font-semibold text-gray-800 capitalize">
                              {categoryInfo?.name || category}
                            </h4>
                            <Badge variant="secondary">{services.length}</Badge>
                          </div>

                          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {services.map((service: any, index: number) => (
                              <Card
                                key={index}
                                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                              >
                                <CardContent className="p-6">
                                  <div className="flex justify-between items-start mb-3">
                                    <div>
                                      <h5 className="font-semibold text-lg text-gray-900">{service.name}</h5>
                                      <p className="text-sm text-gray-600 flex items-center mt-1">
                                        <MapPin className="h-3 w-3 mr-1" />
                                        {service.address}
                                      </p>
                                    </div>
                                    <div className="flex items-center">
                                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                      <span className="text-sm font-medium ml-1">{service.rating}</span>
                                    </div>
                                  </div>

                                  <div className="space-y-2 mb-4">
                                    <div className="flex items-center text-sm text-gray-600">
                                      <Phone className="h-4 w-4 mr-2 text-blue-600" />
                                      {service.phone}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                      <Clock className="h-4 w-4 mr-2 text-blue-600" />
                                      {service.hours}
                                    </div>
                                  </div>

                                  <div className="mb-4">
                                    <p className="text-xs font-medium text-gray-700 mb-2">Services:</p>
                                    <div className="flex flex-wrap gap-1">
                                      {service.services.map((svc: string, idx: number) => (
                                        <Badge key={idx} variant="outline" className="text-xs">
                                          {svc}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                                      onClick={() => window.open(`tel:${service.phone}`, "_self")}
                                    >
                                      <Phone className="h-4 w-4 mr-1" />
                                      Call
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="flex-1 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 bg-transparent"
                                      onClick={() => {
                                        // Check if this is Pilirani Judo's listing
                                        if (service.name === "Pilirani Judo - Optometrist") {
                                          window.location.href = "/provider/pilirani-judo"
                                        } else {
                                          // For other providers, show a coming soon message or generic details
                                          alert("Provider details coming soon!")
                                        }
                                      }}
                                    >
                                      View Details
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </>
          ) : searchQuery ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600 mb-4">We couldn't find any healthcare services in "{searchQuery}".</p>
              <p className="text-sm text-gray-500 mb-6">
                Try searching for areas like: Blantyre, Limbe, Chichiri, Mandala, Ndirande, Chilomoni, or Mount Pleasant
              </p>
              <Button
                onClick={() => setSearchQuery("")}
                variant="outline"
                className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600"
              >
                Clear Search
              </Button>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Your Search</h3>
              <p className="text-gray-600 mb-6">Enter an area name above to find healthcare services near you</p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  "Blantyre",
                  "Limbe",
                  "Chichiri",
                  "Mandala",
                  "Ndirande",
                  "Chilomoni",
                  "Mount Pleasant",
                  "Sunnyside",
                ].map((area) => (
                  <Button
                    key={area}
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchQuery(area)}
                    className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600"
                  >
                    {area}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 mt-12">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Image src="/logo.png" alt="Health Hub MW Logo" width={32} height={32} className="object-contain" />
                <div>
                  <h3 className="text-lg font-bold">Blantyre Health Hub</h3>
                  <p className="text-xs text-gray-400">Your Health Directory</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Connecting Blantyre residents with trusted healthcare providers and wellness services.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Pharmacies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Opticians
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Dentists
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Gyms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Skincare
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/#about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Emergency</h4>
              <div className="space-y-2 text-sm">
                <p className="text-red-400 font-semibold">Emergency: 997</p>
                <p className="text-gray-400">Police: 990</p>
                <p className="text-gray-400">Fire: 998</p>
                <p className="text-gray-400">Ambulance: 998</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Blantyre Health Hub. All rights reserved. | Serving Blantyre, Malawi</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
